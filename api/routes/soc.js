const express = require('express')
const _ = require('lodash')
const jwtRest = require('express-jwt')
const { requestLog } = require('../lib/common')
const { validateMiddleware } = require('../lib/common')
const { searchTrident } = require('../lib/elasticsearch_query')

const router = express.Router()

// const today = new Date()
// const dd = ('0' + today.getDate()).slice(-2)
// const mm = ('0' + (today.getMonth() + 1)).slice(-2) + '.'
// const yyyy = today.getFullYear() + '.'
// const index = "logstash-" + yyyy + mm + dd

router.get('/two-way', 
	// validateMiddleware,
	// jwtRest({secret: process.env.JWT_SECRET}),
	function(req, res, next){
		let trident = "Trident" + req.query.trident
		let startFrom = req.query.index || 0
		let ip = req.query.ip
		let time = req.query.time
		let date = new Date(req.query.date)
		let dd = ('0' + date.getDate()).slice(-2)
		let mm = ('0' + (date.getMonth() + 1)).slice(-2) + '.'
		let yyyy = date.getFullYear() + '.'
		let index = 'logstash-' + yyyy + mm + dd
		console.log(index)
		let queryString = searchTrident(trident,startFrom)
		// let querySource = searchTrident(trident,startFrom, "source_ip", "199.58.212.214")
		// let queryDest = searchTrident(trident,startFrom, "destination_ip", "199.58.212.214")
		// let queryArray = []
		// queryArray.push({}, querySource, {}, queryDest)
		return client.search({index, body:queryString})
		.then(result => {
			// console.log(result.responses[0].hits)
			// let alert1 = result.responses[0].hits.hits
			// let alert2 = result.responses[1].hits.hits
			// let alerts = alert1.concat(alert2)
			let alerts = result.hits.hits
			let twoWayArray = []
			alerts.map(alert => {
				let source = alert._source.source_ip
				let dest = alert._source.destination_ip
				alerts.map(a => {
					// console.log(a._source.destination_ip)
					// console.log(source) 
					if(source === a._source.destination_ip && dest === a._source.source_ip){
						// console.log('two way traffic')
						twoWayArray.push(a)
					}
				})					
			})
			let dedupArray = []
			let sameArray = []
			// twoWayArray.map((a,i) => {
			// 	if(twoWayArray[i + 1]){
			// 		let b = twoWayArray[i]
			// 		let c = twoWayArray[i + 1]
			// 		dedupArray.push(b,c)
			// 		twoWayArray.map((d,j) => {
			// 			if(twoWayArray[j + 1]){
			// 				let e = twoWayArray[j]
			// 				let f = twoWayArray[j + 1]
			// 				if(e._source.source_ip === b._source.source_ip && f._source.source_ip === c._source.source_ip || 
			// 					f._source.source_ip === b._source.source_ip && e._source.source_ip === c._source.source_ip){
			// 					console.log('the same two way traffic')
			// 					sameArray.push(e,f)
			// 				}else{
			// 					dedupArray.push(e,f)
			// 				}
			// 			}
			// 		})
			// 	}
			// })
			let array = _.uniqBy(twoWayArray, function(a){
				// console.log(a)
				return a._source.source_ip && a._source.destination_ip
			})
			console.log(array.length)
			console.log(dedupArray.length)
			console.log(sameArray.length)
			console.log(twoWayArray.length)
			res.status(200).send(twoWayArray)
		})
		.catch(err => {
			console.log(err)
			res.status(400).send('error with backend')
		})
	})

module.exports = router