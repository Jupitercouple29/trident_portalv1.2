const jwtRest = require('express-jwt')
const { requestLog } = require('../lib/common')
const { uniqDescOrderedList } = require('../lib/common')
const { validateMiddleware } = require('../lib/common')
const { locationAlerts } = require('../lib/elasticsearch_query') 
const { coordinatesSearch } = require('../lib/elasticsearch_query')
const { searchEventObject } = require('../lib/elasticsearch_query')
const { searchSignatureObject } = require('../lib/elasticsearch_query')
const { searchObject } = require('../lib/elasticsearch_query')
const { searchTridentAlerts } = require('../lib/elasticsearch_query')
const { compileLatAndLongArray } = require('../lib/common')
const { mSearchNumOfAlerts } = require('../lib/elasticsearch_query')
const { searchItemClicked } = require('../lib/elasticsearch_query')
const { clientMapAlert } = require('../lib/elasticsearch_query')
const { searchByIPs } = require('../lib/elasticsearch_query')

const express = require('express')
const router = express.Router()

const today = new Date()
const dd = ('0' + today.getDate()).slice(-2)
const mm = ('0' + (today.getMonth() + 1)).slice(-2) + '.'
const yyyy = today.getFullYear() + '.'
const index = "logstash-" + yyyy + mm + dd

/**
 * Pings the elasticsearch client
 * @return {string}  returns whether the elasticsearch cluster is running or not
 */
router.get('/ping',
  function(req, res, next) {
    return client.ping({
      requestTimeout: 30000
    }, function(error) {
      if (error) {
        log.error(requestLog(error, 500, 'Elasticsearch cluster is not responding'))
        res.status(500).send('Elasticsearch cluster is not responding')
      } else {
        log.info(requestLog(req, 200, 'All is well'))
        res.status(200).send('All is well')
      }
    })
})

/**
 * Gets alertsLastHour, lastEventTime, signatureAlerts, allAlerts from elasticsearch
 * @param  {array} req.query.trident  an array of tridents
 * @return {array} returns an array of values 
 *  ex.  alertsLastHour, lastEventTime, signatureAlerts, allAlerts
 */
router.get('/',
  validateMiddleware,
  jwtRest({secret: process.env.JWT_SECRET}),
  function(req, res, next) {
    let queryString = ''
    if (req.query.trident && Array.isArray(req.query.trident)) {
      //forms a concatenated list of tridents ex. "Trident2411 Trident2422"
      req.query.trident.map((param, i) => {
        let trident = "Trident" + param + " "
        queryString += trident
      })
      //elasticsearch query params
      let query = searchObject(queryString)
      return client.search({index, body: query})
      .then(function(resp) {
        log.info(requestLog(req, 200))
        res.status(200).send(resp)
      }, function(err) {
        log.error(requestLog(req, 400, err.message))
        res.status(400).send('Error with elasticsearch')
      })
    } else {
      log.error(requestLog(req, 400, 'No tridents provided'))
      res.status(400).send("No Tridents")
    }
})

/** 
 * Gets all alerts, signature alerts, destination ips, and source ips for one trident
 * @param  {number} req.query.trident  the trident number
 * @return {object}  returns an object of values listed above
 */
router.get('/alerts',
  validateMiddleware,
  jwtRest({secret: process.env.JWT_SECRET}),
  function(req, res, next) {
  if (req.query.trident) {
    let trident = "Trident" + req.query.trident
    let queryString = searchTridentAlerts(trident)
    return client.search({index, body: queryString})
    .then(function(resp) {
      let alerts = resp.hits.hits
      let signatureAlerts = resp.aggregations.signatures.buckets
      let dest_ips = resp.aggregations.dest_ips.buckets
      let source_ips = resp.aggregations.source_ips.buckets
      var body = {
        alerts: alerts,
        ips: source_ips,
        signatureAlerts,
        dest_ips: dest_ips
      }
      log.info(requestLog(req, 200))
      res.status(200).send(body)
    })
    .catch(function(err) {
      log.error(requestLog(req, 400, err.message))
      res.status(400).send(err.message)
    })
  } else {
    log.error(requestLog(req, 400, 'No tridents provided'))
    res.status(400).send("No Tridents")
  }
})

router.get('/alerts/:type',
  validateMiddleware,
  jwtRest({secret: process.env.JWT_SECRET}),
  function(req, res, next) {
    if (req.query.trident) {
      let queryString = ''
      let tridentString = ''
      let type = req.params.type
      let trident = "Trident" + req.query.trident
      if (req.params.type == "signatures") {
          queryString = searchSignatureObject(trident)
        } else {
          queryString = searchEventObject(trident, type)
        }
      return client.search({index, body: queryString})
      .then(function(resp) {
        let alerts = resp.hits.hits
        let body = {
          alerts
        }
        log.info(requestLog(req, 200))
        res.status(200).send(body)
      })
      .catch(function(err) {
        log.error(requestLog(req, 400, err.message))
        res.status(400).send(err.message)
      })
    } else {
      log.error(requestLog(req, 'No tridents provided'))
      res.status(400).send('No tridents provided')
    }
})

router.get('/count', 
	validateMiddleware,
	jwtRest({secret: process.env.JWT_SECRET}),
	function(req, res, next ){
		let queryArray = []
		if (req.query.trident && Array.isArray(req.query.trident)) {
      req.query.trident.map((param, i) => {
        let trident = "Trident" + param
        let queryString = {}
        let type = req.query.type
        queryString = mSearchNumOfAlerts(trident)
        queryArray.push({}, queryString)
        return queryArray
      })
      return client.msearch({index, body: queryArray})
      .then(function(resp) {
        let alerts = resp.responses
        let body ={}
        req.query.trident.map((t,i)=>{
					body[t] = alerts[i].hits.total
        })
        log.info(requestLog(req, 200))
        res.status(200).send(body)
      })
      .catch(function(err) {
        log.error(requestLog(req, 400, err.message))
        res.status(400).send(err.message)
      })
    } else {
      log.error(requestLog(req, 'No tridents provided'))
      res.status(400).send('No tridents provided')
    }
	})

router.get('/item', 
  // validateMiddleware,
  // jwtRest({secret: process.env.JWT_SECRET}),
  function(req, res, next){
    let trident = "Trident" + req.query.trident
    let title = req.query.title
    let info = req.query.info
    let queryString = searchItemClicked(trident,title,info)
    return client.search({index, body: queryString})
    .then(result => {
      log.info(requestLog(req, 200, result))
      res.status(200).send(result.hits.hits)
    })
    .catch(err => {
      log.error(requrestLog(req, 401, err))
      res.status(401).send(err.responses)
    })
  })

router.get('/client/mapAlert',
  // validateMiddleware,
  // jwtRest({secret:process.env.JWT_SECRET}),
  function(req, res, next){
    let info = req.query.info
    let trident = "Trident" + info.trident
    let lat = info.lat
    let long = info.long
    let ipArray = info.ipArray
    let queryArray = [], alerts = [], alertsArray = []
    let queryStringSource = clientMapAlert(trident, "source_ip", lat , long, ipArray)
    let queryStringDest = clientMapAlert(trident, "destination_ip", lat, long, ipArray)
    queryArray.push({}, queryStringSource, {}, queryStringDest)
    client.msearch({index, body: queryArray})
    .then(result => {
      // console.log(result.responses)
      alertsArray.push(result.responses[0].hits.hits, result.responses[1].hits.hits)
      alerts = alertsArray[0].concat(alertsArray[1])
      alerts.sort(function(a,b){
        var timeA = a._source.timestamp
        var timeB = b._source .timestamp  
        if(timeA < timeB){
          return -1
        }
        if(timeA > timeB){
          return 1
        }
        return 0
      })
    
      log.info(requestLog(req, 200, alerts))
      res.status(200).send(alerts)
    })
    .catch(err => {
      log.error(requestLog(req, 400, err))
      res.status(400).send(err)
    })
  })

router.get('/client',
  // validateMiddleware,
  // jwtRest({secret:process.env.JWT_SECRET}),
  function(req, res, next){
    let trident = "Trident" + req.query.trident
    let ipArray = req.query.ipArray
    let queryStringSource = searchByIPs(trident, "source_ip", ipArray)
    let queryStringDest = searchByIPs(trident, "destination_ip", ipArray)
    let queryArray = []
    queryArray.push({}, queryStringSource, {}, queryStringDest)
    client.msearch({index, body: queryArray})
    .then(resp => {
      let result1 = resp.responses[0].aggregations
      let result2 = resp.responses[1].aggregations 
      let alertsArray = [], latAndLongArray = [], 
          coordsArray = [], alerts = [], source_ips = [], 
          dest_ips = [], signatures = []
      if (result1 && result1.lat.buckets.length) {
        result1.lat.buckets.map(lat => {
          latAndLongArray.push(compileLatAndLongArray(lat.key,lat.long.buckets))
        })
        coordsArray = coordsArray.concat(...latAndLongArray)
      }
      if (result2 && result2.lat.buckets.length) {
        result2.lat.buckets.map(lat => {
          latAndLongArray.push(compileLatAndLongArray(lat.key,lat.long.buckets))
        })
        coordsArray = coordsArray.concat(...latAndLongArray)
      }
      if (resp.responses[0].hits.hits && resp.responses[1].hits.hits){
        alertsArray.push(resp.responses[0].hits.hits, resp.responses[1].hits.hits) 
        alerts = alertsArray[0].concat(alertsArray[1])
        alerts.sort(function(a,b){
          var timeA = a._source.timestamp
          var timeB = b._source .timestamp  
          if(timeA < timeB){
            return -1
          }
          if(timeA > timeB){
            return 1
          }
          return 0
        })
      }
      source_ips = result1.source_ips.buckets
      dest_ips = result1.dest_ips.buckets
      signatures = result1.signatures.buckets.concat(result2.signatures.buckets)
      let body = {
        alerts,
        coordsArray,
        source_ips,
        dest_ips,
        signatures
      }
      log.info(requestLog(req, 200, body))
      res.status(200).send(body)
    })
    .catch(err => {
      log.error(requestLog(req, 400, err))
      res.status(400).send(err)
    })
  })
module.exports = router