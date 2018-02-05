var jwt = require('jsonwebtoken');
const jwtRest = require('express-jwt')
var firebase = require('firebase');
var bcrypt = require('bcryptjs');
var requestLog = require('../lib/common').requestLog
var validateEmail = require('../lib/common').validateEmail
const { validateMiddleware } = require('../lib/common')
var express = require('express');
var router = express.Router();

/**
 * Allows admin users to post pdf reports to the corresponding email
 * @param  {string}  req.params.email  the email to post to
 * @param  {string}  req.params.reportName  the name of the report
 * @param  {File}    req.body  the pdf file to post  
 * @return {string}  returns a string with the given success or failure of the post
 */
router.post('/:email/:reportName',
	validateMiddleware,
	jwtRest({secret:process.env.JWT_SECRET}),
	function(req, res, next){
		console.log(req.body)
		let email = req.params.email
		let reportName = req.params.reportName
		let file = req.body
		//stringify the file for easier storage 
		let pdf = JSON.stringify(file)
		//validate email
		if(!validateEmail(email)) {
			log.error(requestLog(req, 401, 'Invalid email'))
			res.status(401).send('Invalid email')
		}
		let rootRef = firebase.database().ref('users');
		rootRef.orderByChild('email').equalTo(email).once('value')
		.then(snap => {
			if(snap.val()){
				//gets the unique key of the user
				let userKey = Object.keys(snap.val())
				//gets the user based on the userkey
				let userRef = rootRef.child(userKey[0])
				//gets reports section for the user referenced
				let reports = userRef.child('reports')
				//pushes the new report into the reports section with a unique key
				reports.push({
					report: pdf,
				  reportName: reportName
				})
				log.info(requestLog(req,200,'File has been added successfully'))
				res.status(200).send('success')
			}else{
				log.error(requestLog(req, 404, 'Unable to find user to update'))
				res.status(404).send('Invalid email. Unable to update user at ' + email)
			}
		})
		.catch(err => {
			console.log('there is an error')
			console.log(err)
			log.error(requestLog(req, 500, 'Firebase error'))
			res.status(500).send('Firebase error. Unable to update user at ' + email)
		})
	})

/**
 * gets all the reports of the logged in user by email
 * @param  {string}  req.query.email  the email of the logged in user
 * @return {string}  returns the pdf reports
 */
router.get('/',
	validateMiddleware,
	jwtRest({secret:process.env.JWT_SECRET}),
	function(req, res, next){
		let email = req.query.email
		//validate email
		if(!validateEmail(email)){
			log.error(requestLog(req, 400, 'Invalid email'))
			res.status(400).send('Please enter a valid email')
		}
		let rootRef = firebase.database().ref('users')
		rootRef.orderByChild('email').equalTo(email).once('value')
		.then(snap => {
			if(snap.val()){
				//gets the unique key of the user
				let userKey = Object.keys(snap.val())
				//gets the user based on the userkey
        let userRef = rootRef.child(userKey[0])
        //gets all of the info related to this user
        let result = snap.val()[userKey[0]]
        //gets the reports for the given user
				let reports = result.reports || 'no reports available'
				log.info(requestLog(req, 200, 'Retrieved reports for email ' + email))
				res.status(200).send(reports)
			}else{
				log.error(requestLog(req, 404, email + ' not found'))
				res.status(404).send('Unable to retrieve reports for email ' + email)
			}
		})
		.catch(err => {
			log.error(requestLog(req, 500, 'Firebase error'))
			res.status(500).send('Firebase error. Unable to retrieve user at ' + email)
		})
	})

module.exports = router