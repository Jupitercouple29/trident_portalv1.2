const express = require('express')
const _ = require('lodash')
const jwtRest = require('express-jwt')
const { requestLog } = require('../lib/common')
const { validateMiddleware } = require('../lib/common')
const { searchTrident } = require('../lib/elasticsearch_query')
const { searchBySourceIP } = require('../lib/elasticsearch_query')
const { searchByDestIP } = require('../lib/elasticsearch_query')
const { searchBySourceAndDestIP } = require('../lib/elasticsearch_query')

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
		let clientSearch = client.search({index, body:queryString})
		if(ip){
			let querySource = searchBySourceIP(trident,startFrom, ip)
			let queryDest = searchByDestIP(trident,startFrom, ip)
			let queryArray = []
			queryArray.push({}, querySource, {}, queryDest)
			clientSearch = client.msearch({index, body: queryArray})
		} 
		return clientSearch
		.then(result => {
			let alerts
			if(result.responses){
				response1 = result.responses[0].hits.hits
				response2 = result.responses[1].hits.hits
				alerts = response1.concat(response2)
			}else{
			  alerts = result.hits.hits
			}
			let twoWayArray = []
			let dedupArray = []
			let sameArray = []
			let count = 0
			alerts.map((alert, i) => {
				let source = alert._source.source_ip
				let dest = alert._source.destination_ip
				let al
				let isTwoWay = false
				alerts.map((a, j) => {
					if(source === a._source.destination_ip && dest === a._source.source_ip){
						twoWayArray.push(alert, a)
					}
				})
				if(isTwoWay){
					twoWayArray.push(alert,al)	
				}
			})
	
			let uniqSource = _.uniqBy(twoWayArray, function(a){
				// console.log(a)
				return a._source.source_ip
			})
			let uniqDest = _.uniqBy(twoWayArray, function(a){
				return a._source.destination_ip
			})
			let array = uniqSource.concat(uniqDest)
			console.log(array.length)
			console.log(dedupArray.length)
			console.log(sameArray.length)
			console.log(twoWayArray.length)
			res.status(200).send(array)
		})
		.catch(err => {
			console.log(err)
			console.log(err.message)
			res.status(400).send(err.message)
		})
	})

module.exports = router