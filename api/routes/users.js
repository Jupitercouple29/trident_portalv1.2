var jwt = require('jsonwebtoken');
var firebase = require('firebase');
var bcrypt = require('bcryptjs');
var requestLog = require('../lib/common').requestLog
var express = require('express');
var router = express.Router();


var firebaseApp = firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH,
  databaseURL: process.env.FIREBASE_URL,
  projectId: process.env.FIREBASE_ID,
  storageBucket: process.env.FIREBASE_BUCKET,
  messagingSenderId: process.env.FIREBASE_SENDER_ID
})

router.post('/', function(req, res, next){
  let body = req.body;
  let email = body.email;
  let pswd = body.pswd;
  let validUser = {};
  let rootRef = firebase.database().ref('users');
  rootRef.orderByChild('email').equalTo(req.body.email).once('value')
  .then(function (snap){
    if(snap.val()){
      let userKey = Object.keys(snap.val())
      let result = snap.val()[userKey[0]]
      validUser = Object.assign(
        {},
        {email:result.email},
        {name:result.name},
        {tridents:result.tridents},
        {company:result.company},
        {creds:result.creds}
      )
      bcrypt.compare(pswd, result.password, function(err, response){
        if(err){
          let _error = 'Login failed: Email/Password is incorrect';
          log.error(requestLog(req, 'Bcrypt Compare Error'))
          res.status(400).send(_error);
        } else if(response){
          var jwtToken = jwt.sign(
            {user:validUser, date:new Date()},
            config.jwt.secret
          );
          var user = Object.assign(
            {},
            {validUser:validUser},
            {jwtToken: jwtToken}
          )
          log.info(requestLog(req,200))
          res.status(200).send(user)
        } else {
          let _error = 'Login failed: Email/Password is incorrect';
          log.error(requestLog(req, 'Invalid Password'))
          res.status(401).send(_error);
        }
      })
    } else {
        let _error = 'Login failed: Email/Password is incorrect';
        log.error(requestLog(req, 'Invalid Email'))
        res.status(401).send(_error);
    }
  }).catch(function(err){
    let _error = 'Login failed: Email/Password is incorrect';
    log.error(err, 'Invalid Email')
    res.status(401).send(_error);
  })
})

router.post('/update', function(req, res, next){
  let name = req.body.name ? req.body.name : null
  let email = req.body.email ? req.body.email : null
  let pswd = req.body.pswd ? req.body.pswd : null
  bcrypt.genSalt(10, function(err, salt){
    if(err) log.error(req, 'Invalid in bcrypt.genSalt')
    bcrypt.hash(pswd, salt, function(err, hash){
      if(err) log.error(req, 'Invalid in bcrypt.hash')
      let rootRef = firebase.database().ref('users');
      rootRef.orderByChild('email').equalTo(email).once('value')
      .then(snap =>{
        if(snap.val()){
          let userKey = Object.keys(snap.val())
          let result = snap.val()[userKey[0]]
          name = result.name
          let userRef = rootRef.child(userKey[0])
          userRef.update({password:hash})
          requestLog(req, 'Password has been updated for ' + name)
          res.status(201).send(name + ' has been updated successfully')
        }else {
          requestLog(req, 'Invalid email')
          res.status(401).send('Unable to update user at ' + email)
        }
      })
      .catch(err => {
        requestLog(req, 'Firebase error')
        res.status(401).send('Unable to update user at ' + email)
      })
    })
  })
})

router.post('/new_user', function(req, res, next){
  let name = req.body.name
  let email = req.body.email
  let creds = req.body.creds
  let pswd = req.body.pswd
  // tridents have to be in a value key pair. The key should be the company name 
  // attached to the trident and the value should be an array of tridents.
  let tridents = req.body.tridents
  bcrypt.genSalt(10, function(err, salt){
    if(err) log.error(req, 'Invalid in bcrypt.genSalt')
    bcrypt.hash(pswd, salt, function(err, hash){
      if(err) log.error(req, 'Invalid in bcrypt.hash')
      let rootRef = firebase.database().ref('users');
      rootRef.push({
        name:name,
        email:email,
        creds:creds,
        password:hash,
        tridents: tridents
      })
      .then(snap =>{
        requestLog(req, name + 'has been added successfully')
        res.status(201).send(name + ' has been added successfully')
      })
      .catch(err => {
        requestLog(req, 'Firebase error')
        res.status(401).send('Unable to add user ' + name + '. Please try again.')
      })
    })
  })
})

module.exports = router