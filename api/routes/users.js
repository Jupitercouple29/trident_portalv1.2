const jwt = require('jsonwebtoken');
const jwtRest = require('express-jwt')
const firebase = require('../config/firebase');
const bcrypt = require('bcryptjs');
const requestLog = require('../lib/common').requestLog
const validateEmail = require('../lib/common').validateEmail
const { validateMiddleware } = require('../lib/common')
const express = require('express');
const router = express.Router();

if (process.env.NODE_ENV === 'test') {
  require('dotenv').config();
}

/**
 * Post used to verify login to the portal. Also verifies the number of attempts
 * the user has tried to login
 * @param  {string} req.body.email   email
 * @param  {string} req.body.pswd   password
 * @param  {number} req.body.loginAttempts   login attempts
 * @return {object}  returns an object with a list of user defined data inside of a
 *    jsonwebtoken enabling secure transfor of user data
 */
router.post('/', function (req, res, next) {
  let body = req.body;
  let email = body.email;
  let pswd = body.pswd;
  let loginAttempts = body.loginAttempts || 0
  let validUser = {};
  let rootRef = firebase.database().ref('users');
  let jwtToken = jwt.sign(
    { logoutDate: new Date(), loginAttempts },
    process.env.JWT_SECRET
  )
  let _error = {
    message: 'Login failed: Email/Password is incorrect',
    jwtToken
  }
  firebase.auth().signInWithEmailAndPassword(email, pswd).then(authRes => {
    if (loginAttempts < 4) {
      rootRef.orderByChild('uid').equalTo(authRes.uid).once('value')
        .then(function (snap) {
          if (snap.val()) {
            let userKey = Object.keys(snap.val())
            let userRef = rootRef.child(userKey[0])
            let result = snap.val()[userKey[0]]
            validUser = Object.assign(
              {},
              { email: result.email },
              { name: result.name },
              { tridents: result.tridents },
              { company: result.company },
              { creds: result.creds },
              { phone: result.phone },
              { logo: result.logo },
              { seller: result.seller },
              { ips: result.ips },
              { client: result.client }
            )
            //used for portal login
            if (email && pswd) {
              bcrypt.compare(pswd, result.password, function (err, response) {
                if (err) {
                  log.error(requestLog(req, 'Bcrypt Compare Error'))
                  res.status(400).send(_error);
                } else if (response) {
                  let jwtToken = jwt.sign(
                    { user: validUser, date: new Date() },
                    process.env.JWT_SECRET
                  );
                  var user = Object.assign(
                    {},
                    { validUser: validUser },
                    { jwtToken: jwtToken }
                  )
                  log.info(requestLog(req, 200))
                  res.status(200).send(user)
                } else {
                  // userRef.update({logoutDate:new Date()})
                  log.error(requestLog(req, 401, 'Invalid Password'))
                  res.status(401).send(_error);
                }
              })
            } else {
              //used to send user info for the profile page
              log.info(requestLog(req, 200, validUser))
              res.status(200).send(validUser)
            }
          } else {
            log.error(requestLog(req, 404, 'Invalid Email'))
            res.status(404).send(_error);
          }
        })
        .catch(function (err) {
          console.log(5555, err)
          log.error(err, 500, 'Firebase error')
          res.status(500).send('Firebase error \n' + _error);
        })
    } else {
      log.error(requestLog(req, 401, 'Invalid Email'))
      res.status(401).send(_error);
    }
  }, autErr => {
    res.status(404).send(autErr)
  });
})

/**
 * Post used to update the users info
 * @param  {string}   req.body.name    name
 * @param  {string}   req.body.email   email
 * @param  {string}   req.body.pswd    password
 * @param  {object}   req.body.tridents   key value pair of tridnets
 * @param  {object}   req.body.image   the users logo
 * @return {string}   returns a string notifying user update
 */
router.post('/update', function (req, res, next) {
  let name = req.body.name ? req.body.name : null
  let email = req.body.email ? req.body.email : null
  let pswd = req.body.pswd ? req.body.pswd : null
  // tridents have to be in a key value pair. The key should be the company name
  // attached to the trident and the value should be an array of tridents.
  // ex.  tridents = {
  //         "Perc": [ "Trident2411", "Trident2412"]
  //      }
  let tridents = req.body.tridents
  let image = req.body.image
  if (name && email && tridents) {
    let rootRef = firebase.database().ref('users');
    rootRef.orderByChild('email').equalTo(email).once('value')
      .then(snap => {
        if (snap.val()) {
          let userKey = Object.keys(snap.val())
          let userRef = rootRef.child(userKey[0])
          userRef.update({
            name: name,
            email: email,
            tridents: tridents
          })
          log.info(requestLog(req, 201, 'Account has been updated for ' + name))
          res.status(201).send(name + ' has been updated successfully')
        } else {
          log.error(requestLog(req, 404, 'Invalid email'))
          res.status(404).send('Invalid email. Unable to update users at ' + email)
        }
      })
      .catch(err => {
        log.error(requestLog(req, 500, 'Firebase error'))
        res.status(500).send('Firebase error. Unable to update user at ' + email)
      })
  } else {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) log.error(req, 'Invalid in bcrypt.genSalt')
      bcrypt.hash(pswd, salt, function (err, hash) {
        if (err) log.error(req, 'Invalid in bcrypt.hash')
        let rootRef = firebase.database().ref('users');
        rootRef.orderByChild('email').equalTo(email).once('value')
          .then(snap => {
            if (snap.val()) {
              let userKey = Object.keys(snap.val())
              let result = snap.val()[userKey[0]]
              name = result.name
              let userRef = rootRef.child(userKey[0])
              userRef.update({ password: hash })
              log.info(requestLog(req, 201, 'Password has been updated for ' + name))
              res.status(201).send(name + ' has been updated successfully')
            } else {
              log.error(requestLog(req, 404, 'Invalid email'))
              res.status(404).send('Unable to update user at ' + email)
            }
          })
          .catch(err => {
            log.error(requestLog(req, 500, 'Firebase error'))
            res.status(500).send('Unable to update user at ' + email)
          })
      })
    })
  }
})

/**
 * Post info to add a new user to the database. Only available internally.
 * @param  {string}   req.body.name    name
 * @param  {string}   req.body.email    email
 * @param  {string}   req.body.creds    credentials 'Admin' or 'User'
 * @param  {string}   req.body.pswd    password
 * @param  {string}   req.body.company    company name
 * @param  {object}   req.body.trident    tridents
 * @param  {string}   req.body.seller    if seller 'true' or 'false'
 * @param  {string}   req.body.ips    array of ips
 * @return {string}   returns the validation of the insertion of a new user
 */
router.post('/new_user', function (req, res, next) {
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
  let seller = req.body.seller || ''
  // ips have to be in a key value pair. The key should be the name for the list of ips
  // and the the values should be an array of ips.
  // ex. ips = {
  //    "VADOF": [10.10.202.222, 10.10.202.234]
  // }
  let ips = req.body.ips || ''
  let client = req.body.client || ''
  if (!name) res.status(400).send('Please enter your name')
  if (!pswd) res.status(400).send('Please enter a password')
  if (!validateEmail(email)) res.status(400).send('Please enter a valid email')
  Object.keys(tridents).map(key => {
    if (!Array.isArray(tridents[key])) res.status(400).send('Please enter an valid tridents')
  })
  bcrypt.genSalt(10, function (err, salt) {
    if (err) log.error(req, 'Invalid in bcrypt.genSalt')
    bcrypt.hash(pswd, salt, function (err, hash) {
      if (err) log.error(req, 'Invalid in bcrypt.hash')
      firebase.auth().createUserWithEmailAndPassword(email, pswd).then(authRes => {
        let rootRef = firebase.database().ref('users');
        rootRef.push({
          name: name,
          email: email,
          creds: creds,
          password: hash,
          company: company,
          tridents: tridents,
          seller: seller,
          ips: ips,
          client: client,
          uid: authRes.uid
        })
          .then(snap => {
            log.info(requestLog(req, 201, name + 'has been added successfully'))
            res.status(201).send(name + ' has been added successfully')
          })
          .catch(err => {
            log.error(requestLog(req, 500, 'Firebase error'))
            res.status(500).send('Unable to add user ' + name + '. Please try again.')
          })
      }, authError => {
        res.status(500).send(authError)
      })
    })
  })
})

/**
 * Post for updating the users profile
 * @param  {string}   req.body.info.name   name
 * @param  {string}   req.body.info.email   email
 * @param  {string}   req.body.info.newEmail   new email address
 * @param  {string}   req.body.info.company   company
 * @param  {string}   req.body.info.phone   phone number
 * @param  {string}   req.body.info.logo   logo
 * @return {string}   returns success if valid
 */
router.post('/update/profile',
  validateMiddleware,
  jwtRest({ secret: process.env.JWT_SECRET }),
  function (req, res, next) {
    let name = req.body.info.name
    let email = req.body.info.email
    let newEmail = req.body.info.newEmail
    let company = req.body.info.company
    let phone = req.body.info.phone
    let logo = req.body.info.logo || ''
    if (!validateEmail(email)) {
      log.error(requestLog(req, 400, 'Invalid email'))
      res.status(400).send('Please enter a valid email')
    }
    let rootRef = firebase.database().ref('users')
    rootRef.orderByChild('email').equalTo(email).once('value')
      .then(snap => {
        if (snap.val()) {
          let userKey = Object.keys(snap.val())
          let userRef = rootRef.child(userKey[0])
          userRef.update({
            name: name,
            email: newEmail,
            company: company,
            phone: phone,
            logo: logo
          })
          log.info(requestLog(req, 201, 'Profile has been updated for ' + name))
          res.status(201).send('success')
        } else {
          log.error(requestLog(req, 404, 'Unable to find user to update'))
          res.status(404).send('Invalid email. Unable to update users at ' + email)
        }
      })
      .catch(err => {
        log.error(requestLog(req, 500, 'Firebase error'))
        res.status(500).send('Firebase error. Unable to update user at ' + email)
      })
  })

module.exports = router