var jwt = require('jsonwebtoken');
const jwtRest = require('express-jwt')
var firebase = require('firebase');
var bcrypt = require('bcryptjs');
var requestLog = require('../lib/common').requestLog
var validateEmail = require('../lib/common').validateEmail
const { validateMiddleware } = require('../lib/common')
var express = require('express');
var router = express.Router();
var multer = require('multer')
var storage = multer.diskStorage({
	destination: function(req,file,callback){
		callback(null, './uploads')
	},
	filename: function(req,file,callback){
		callback(null, file.filename + '-' + Date.now())
	}
})
var upload = multer({dest:'uploads/'})

router.post('/',
	upload.any(),
	// validateMiddleware,
	// jwtRest({secret:process.env.JWT_SECRET}),
	function(req, res, next){
		console.log(req.files)
		console.log(req.headers)
		// console.log(req.body.info.file)
		// let name = req.body.info.name
		// let email = req.body.info.email
		// let file = req.body.info.file
		// if(!validateEmail(email)) {
		// 	log.error(requestLog(req, 401, 'Invalid email'))
		// 	res.status(401).send('Please enter a valid email')
		// }
		// let rootRef = firebase.database().ref('users');
		// rootRef.orderByChild('email').equalTo(email).once('value')
		// .then(snap => {
		// 	console.log(snap.val())
		// 	if(snap.val()){
		// 		let userKey = Object.keys(snap.val())
		// 		let userRef = rootRef.child(userKey[0])
		// 		userRef.update({
		// 			reports:file
		// 		})
		// 		log.info(requestLog(req,200,'File has been added successfully'))
				res.status(200).send('success')
		// 	}else{
		// 		log.error(requestLog(req, 404, 'Unable to find user to update'))
		// 		res.status(404).send('Invalid email. Unable to update user at ' + email)
		// 	}
		// })
		// .catch(err => {
		// 	log.error(requestLog(req, 500, 'Firebase error'))
		// 	res.status(500).send('Firebase error. Unable to update user at ' + email)
		// })
	})

router.get('/',
	validateMiddleware,
	jwtRest({secret:process.env.JWT_SECRET}),
	function(req, res, next){
		let email = req.query.email
		console.log(email)
		console.log(req.params)
		if(!validateEmail(email)){
			log.error(requestLog(req, 400, 'Invalid email'))
			res.status(400).send('Please enter a valid email')
		}
		let rootRef = firebase.database().ref('users')
		rootRef.orderByChild('email').equalTo(email).once('value')
		.then(snap => {
			if(snap.val()){
				// console.log(snap.val()[userKey[0]].name)
				let userKey = Object.keys(snap.val())
        let userRef = rootRef.child(userKey[0])
        let result = snap.val()[userKey[0]]
				let name = result.name
				log.info(requestLog(req, 200, 'Retrieved file for email ' + email))
				res.status(200).send(name)
			}else{
				log.error(requestLog(req, 404, email + ' not found'))
			}
		})
		.catch(err => {
			console.log(err)
			log.error(requestLog(req, 500, 'Firebase error'))
			res.status(500).send('Firebase error. Unable to retrieve user at ' + email)
		})
	})
module.exports = router