var jwt = require('jsonwebtoken');
const jwtRest = require('express-jwt')
var firebase = require('firebase');
var bcrypt = require('bcryptjs');
var requestLog = require('../lib/common').requestLog
var validateEmail = require('../lib/common').validateEmail
const { validateMiddleware } = require('../lib/common')
var express = require('express');
var router = express.Router();

if(process.env.NODE_ENV === 'test'){
  require('dotenv').config();
}

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
  let loginAttempts = body.loginAttempts
  let validUser = {};
  let rootRef = firebase.database().ref('users');
  let jwtToken = jwt.sign(
    {logoutDate:new Date(),loginAttempts},
    process.env.JWT_SECRET
  );
  let _error = {
    message:'Login failed: Email/Password is incorrect',
    jwtToken
  }
  if(loginAttempts < 4){
    rootRef.orderByChild('email').equalTo(req.body.email).once('value')
    .then(function (snap){
      if(snap.val()){
        let userKey = Object.keys(snap.val())
        let userRef = rootRef.child(userKey[0])
        let result = snap.val()[userKey[0]]
        validUser = Object.assign(
          {},
          {email:result.email},
          {name:result.name},
          {tridents:result.tridents},
          {company:result.company},
          {creds:result.creds},
          {phone:result.phone},
          {logo:result.logo},
          {seller:result.seller}
        )
        if(email && pswd){
          bcrypt.compare(pswd, result.password, function(err, response){
            if(err){
              log.error(requestLog(req, 'Bcrypt Compare Error'))
              res.status(400).send(_error);
            } else if(response){
              let jwtToken = jwt.sign(
                {user:validUser, date:new Date()},
                process.env.JWT_SECRET
              );
              var user = Object.assign(
                {},
                {validUser:validUser},
                {jwtToken: jwtToken}
              )
              log.info(requestLog(req,200))
              res.status(200).send(user)
            } else {
              userRef.update({logoutDate:new Date()})
              log.error(requestLog(req, 'Invalid Password'))
              res.status(401).send(_error);
            }
          })
        }else{
          res.status(200).send(validUser)
        }
      } else {
        log.error(requestLog(req, 'Invalid Email'))
        res.status(401).send(_error);
      }
    })
    .catch(function(err){
      log.error(err, 'Invalid Email')
      res.status(401).send(_error);
    })
  }else{
    log.error(req, 'Invalid Email')
    res.status(401).send(_error);
  }
})

router.post('/update', function(req, res, next){
  let name = req.body.name ? req.body.name : null
  let email = req.body.email ? req.body.email : null
  let pswd = req.body.pswd ? req.body.pswd : null
  let tridents = req.body.tridents 
  let image = req.body.image
  if(name && email && tridents){
     let rootRef = firebase.database().ref('users');
      rootRef.orderByChild('email').equalTo(email).once('value')
      .then(snap =>{
        if(snap.val()){
          let userKey = Object.keys(snap.val())
          let userRef = rootRef.child(userKey[0])
          userRef.update({
            name:name,
            email:email,
            tridents:tridents
          })
          requestLog(req, 'Account has been updated for ' + name)
          res.status(201).send(name + ' has been updated successfully')
        }else {
          requestLog(req, 'Invalid email')
          res.status(401).send('Invalid email. Unable to update users at ' + email)
        }
      })
      .catch(err => {
        requestLog(req, 'Firebase error')
        res.status(401).send('Firebase error. Unable to update user at ' + email)
      })
  }else{
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
  }
})

router.post('/new_user', function(req, res, next){
  let name = req.body.name
  let email = req.body.email
  let creds = req.body.creds
  let pswd = req.body.pswd
  let company = req.body.company
  // tridents have to be in a key value pair. The key should be the company name 
  // attached to the trident and the value should be an array of tridents. 
  // ex.  tridents = {
  //         "Perc": [ "Trident2411", "Trident2412"]
  //      }
  let tridents = req.body.tridents
  if(!name) res.status(401).send('Please enter your name')
  if(!pswd) res.status(401).send('Please enter a password')
  if(!validateEmail(email)) res.status(401).send('Please enter a valid email')
  Object.keys(tridents).map(key => { 
    if(!Array.isArray(tridents[key])) res.status(401).send('Please enter an valid tridents')
  })
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
        company:company,
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

router.post('/update/profile', 
  validateMiddleware,
  jwtRest({secret:process.env.JWT_SECRET}),
  function (req, res, next){
    let name = req.body.info.name
    let email = req.body.info.email
    let newEmail = req.body.info.newEmail
    let company = req.body.info.company
    let phone = req.body.info.phone
    let logo = req.body.info.logo || ''
    if(!validateEmail(email)) res.status(401).send('Please enter a valid email')
    let rootRef = firebase.database().ref('users');
    rootRef.orderByChild('email').equalTo(email).once('value')
    .then(snap => {
      console.log('just after then statement')
      if(snap.val()){
        console.log('inside snapval')
        let userKey = Object.keys(snap.val())
        let userRef = rootRef.child(userKey[0])
        userRef.update({
          name: name,
          email: newEmail,
          company: company,
          phone: phone,
          logo: logo
        })
        requestLog(req, 'Profile has been updated for ' + name)
        res.status(201).send('success')
      }else{
        requestLog(req, 'Unable to find user to update')
        res.status(401).send('Invalid email. Unable to update users at ' + email)
      }
    })
    .catch(err => {
      requestLog(req, 'Firebase error')
      res.status(401).send('Firebase error. Unable to update user at ' + email)
    })
  })

module.exports = router