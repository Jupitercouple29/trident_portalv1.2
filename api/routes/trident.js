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
      let day = new Date(req.query.queryDate)
      let dd = ('0' + day.getDate()).slice(-2)
      let mm = ('0' + (day.getMonth() + 1)).slice(-2) + '.'
      let yyyy = day.getFullYear() + '.'
      let queryIndex = "logstash-" + yyyy + mm + dd
      let timeOffSet= new Date().getTimezoneOffset()
      let date = new Date(req.query.date) - timeOffSet
      let minusHour = new Date(req.query.minusHour) - timeOffSet
      let startFrom = req.query.from || 0
      let query = searchObject(queryString, date, minusHour, startFrom)
      return client.search({index:queryIndex, body: query})
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
    //elasticsearch query params
    let queryString = searchTridentAlerts(trident)
    let day = new Date(req.query.queryDate)
    let dd = ('0' + day.getDate()).slice(-2)
    let mm = ('0' + (day.getMonth() + 1)).slice(-2) + '.'
    let yyyy = day.getFullYear() + '.'
    let queryIndex = "logstash-" + yyyy + mm + dd
    return client.search({index:queryIndex, body: queryString})
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

/**
 * Gets alerts based on event_type in the elasticsearch query 
 * ex. dns 
 * @param  {number} req.query.trident  trident number
 * @param  {string} req.params.type    event_type
 * @param  {number} req.query.from    elasticsearch start search from
 * @return {object} returns an object with an array of alerts 
 */
router.get('/alerts/:type',
  validateMiddleware,
  jwtRest({secret: process.env.JWT_SECRET}),
  function(req, res, next) {
    if (req.query.trident) {
      let queryString = ''
      let tridentString = ''
      let type = req.params.type
      let trident = "Trident" + req.query.trident
      let startFrom = req.query.from || 0
      if (req.params.type == "signatures") {
          //elasticsearch query params
          queryString = searchSignatureObject(trident, startFrom)
        } else {
          //elasticsearch query params
          queryString = searchEventObject(trident, type, startFrom)
        }
      let day = new Date(req.query.queryDate)
      let dd = ('0' + day.getDate()).slice(-2)
      let mm = ('0' + (day.getMonth() + 1)).slice(-2) + '.'
      let yyyy = day.getFullYear() + '.'
      let queryIndex = "logstash-" + yyyy + mm + dd
      return client.search({index: queryIndex, body: queryString})
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

/**
 * Gets the total number of alerts for the specified trident
 * @param  {number} req.query.trident   trident number
 * @return {[array]}  returns an array with the trident as the key and
 *    the total number of events as the value for each trident.
 */
router.get('/count', 
	validateMiddleware,
	jwtRest({secret: process.env.JWT_SECRET}),
	function(req, res, next ){
		let queryArray = []
		if (req.query.trident && Array.isArray(req.query.trident)) {
      req.query.trident.map((param, i) => {
        let trident = "Trident" + param
        let queryString = {}
        //elasticsearch query params
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

/**
 * Gets info from elasticsearch based on the title and info passed in 
 * example title is source_ip and info 10.10.202.222
 * @param  {number} req.query.trident   trident
 * @param  {string} req.query.title   title of the searchable source
 * @param  {string} req.query.info   the value of the title to be searched
 * @return {array}  returns an array of alerts matching the requested information
 */
router.get('/item', 
  validateMiddleware,
  jwtRest({secret: process.env.JWT_SECRET}),
  function(req, res, next){
    let trident = "Trident" + req.query.trident
    let title = req.query.title
    let data = req.query.data
    //elasticsearch query params
    let queryString = searchItemClicked(trident,title,data)
    let day = new Date(req.query.queryDate)
    let dd = ('0' + day.getDate()).slice(-2)
    let mm = ('0' + (day.getMonth() + 1)).slice(-2) + '.'
    let yyyy = day.getFullYear() + '.'
    let queryIndex = "logstash-" + yyyy + mm + dd
    return client.search({index: queryIndex, body: queryString})
    .then(result => {
      log.info(requestLog(req, 200, result))
      res.status(200).send(result.hits.hits)
    })
    .catch(err => {
      log.error(requestLog(req, 401, err))
      res.status(401).send(err.responses)
    })
  })

/**
 * Gets the map coordinates and alerts for a client based on source ip and destination ip
 * @param  {number}   req.query.info.trident    trident
 * @param  {number}   req.query.info.lat   latitude
 * @param  {number}   req.query.info.long    longitude
 * @param  {array}   req.query.info.ipArray   array of ip addresses to search
 * @return {array}   returns an array of alerts
 */
router.get('/client/mapAlert',
  validateMiddleware,
  jwtRest({secret:process.env.JWT_SECRET}),
  function(req, res, next){
    let trident = "Trident" + req.query.trident
    let lat = req.query.lat
    let long = req.query.long
    let ipArray = req.query.ipArray
    let queryArray = [], alerts = [], alertsArray = []
    //elasticsearch query params
    let queryStringSource = clientMapAlert(trident, "source_ip", lat , long, ipArray)
    //elasticsearch query params
    let queryStringDest = clientMapAlert(trident, "destination_ip", lat, long, ipArray)
    queryArray.push({}, queryStringSource, {}, queryStringDest)
    let day = new Date(req.query.queryDate)
    let dd = ('0' + day.getDate()).slice(-2)
    let mm = ('0' + (day.getMonth() + 1)).slice(-2) + '.'
    let yyyy = day.getFullYear() + '.'
    let queryIndex = "logstash-" + yyyy + mm + dd
    console.log(queryIndex)
    console.log('here is the queryIndex for mapAlert')
    client.msearch({index: queryIndex, body: queryArray})
    .then(result => {
      alertsArray.push(result.responses[0].hits.hits, result.responses[1].hits.hits)
      alerts = uniqDescOrderedList(alertsArray[0].concat(alertsArray[1]))    
      log.info(requestLog(req, 200, alerts))
      res.status(200).send(alerts)
    })
    .catch(err => {
      log.error(requestLog(req, 400, err))
      res.status(400).send(err)
    })
  })

/**
 * Gets all alerts based on ip's that are passed in
 * @param  {number} req.query.trident   trident
 * @param  {array} req.query.ipArray   array of ip addresses
 * @return {object}  returns an object with the resulting alerts array, 
 *    coordsArray, source_ips, dest_ips, and signatures
 */
router.get('/client',
  validateMiddleware,
  jwtRest({secret:process.env.JWT_SECRET}),
  function(req, res, next){
    let trident = "Trident" + req.query.trident
    let ipArray = req.query.ipArray
    //elasticsearch query params
    let queryStringSource = searchByIPs(trident, "source_ip", ipArray)
    //elasticsearch query params
    let queryStringDest = searchByIPs(trident, "destination_ip", ipArray)
    let queryArray = []
    queryArray.push({}, queryStringSource, {}, queryStringDest)
    let day = new Date(req.query.queryDate)
    let dd = ('0' + day.getDate()).slice(-2)
    let mm = ('0' + (day.getMonth() + 1)).slice(-2) + '.'
    let yyyy = day.getFullYear() + '.'
    let queryIndex = "logstash-" + yyyy + mm + dd
    console.log(queryIndex)
    console.log('here is the queryIndex _____________________________________________')
    client.msearch({index: queryIndex, body: queryArray})
    .then(resp => {
      console.log(resp)
      let result1 = resp.responses[0].aggregations
      let result2 = resp.responses[1].aggregations 
      let alertsArray = [], latAndLongArray = [], 
          coordsArray = [], alerts = [], source_ips = [], 
          dest_ips = [], signatures = []
      if (result1 && result1.lat.buckets.length) {
        result1.lat.buckets.map(lat => {
          //gathers all possible lat and long values
          latAndLongArray.push(compileLatAndLongArray(lat.key,lat.long.buckets))
        })
        coordsArray = coordsArray.concat(...latAndLongArray)
      }
      if (result2 && result2.lat.buckets.length) {
        result2.lat.buckets.map(lat => {
          //gathers all possible lat and long values
          latAndLongArray.push(compileLatAndLongArray(lat.key,lat.long.buckets))
        })
        coordsArray = coordsArray.concat(...latAndLongArray)
      }
      if (resp.responses[0].hits.hits && resp.responses[1].hits.hits){
        alertsArray.push(resp.responses[0].hits.hits, resp.responses[1].hits.hits) 

        //concatenates the two results and sorts them in descending order
        alerts = uniqDescOrderedList(alertsArray[0].concat(alertsArray[1]))
      }
      source_ips = uniqDescOrderedList(result1.source_ips.buckets.concat(result2.source_ips.buckets))
      dest_ips = uniqDescOrderedList(result1.dest_ips.buckets.concat(result2.dest_ips.buckets))
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