const jwtRest = require('express-jwt')
const jwt = require('jsonwebtoken')
const { requestLog } = require('../lib/common')
const { uniqDescOrderedList } = require('../lib/common')
const { validateMiddleware } = require('../lib/common')
const { locationAlerts } = require('../lib/elasticsearch_query') 
const { coordinatesSearch } = require('../lib/elasticsearch_query')
const { searchEventObject } = require('../lib/elasticsearch_query')
const { searchSignatureObject } = require('../lib/elasticsearch_query')
const { searchObject } = require('../lib/elasticsearch_query')
const { searchMultiTridentAlerts } = require('../lib/elasticsearch_query')
const { compileLatAndLongArray } = require('../lib/common')
const { mSearchNumOfAlerts } = require('../lib/elasticsearch_query')
const { searchItemClicked } = require('../lib/elasticsearch_query')

const express = require('express')
const router = express.Router()

const today = new Date()
const dd = ('0' + today.getDate()).slice(-2)
const mm = ('0' + (today.getMonth() + 1)).slice(-2) + '.'
const yyyy = today.getFullYear() + '.'
// const index = "logstash-2017.12.26"
const index = "logstash-" + yyyy + mm + dd

router.get('/ping',
  function(req, res, next) {
    return client.ping({
      requestTimeout: 30000
    }, function(error) {
      if (error) {
        console.error('elasticsearch cluster is down');
        res.status(500).send('Elasticsearch cluster is not responding')
      } else {
        console.log('All is well')
        res.status(200).send('All is well')
      }
    })
})

router.get('/',
  validateMiddleware,
  jwtRest({secret: process.env.JWT_SECRET}),
  function(req, res, next) {
    let queryString = ''
    console.log(req.query)
    if (req.query.trident && Array.isArray(req.query.trident)) {
      req.query.trident.map((param, i) => {
        let trident = "Trident" + param + " "
        queryString += trident
      })
      let date = new Date()
      let minusHour = new Date().setHours(new Date().getHours() - 1)
      console.log(date)
      console.log(new Date(minusHour))
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

router.get('/alerts',
  validateMiddleware,
  jwtRest({secret: process.env.JWT_SECRET}),
  function(req, res, next) {
  if (req.query.trident) {
    let trident = "Trident" + req.query.trident
    let queryString = searchMultiTridentAlerts(trident)
    return client.search({index, body: queryString})
    .then(function(resp) {
      let alerts = resp.hits.hits
      let signatureAlerts = resp.aggregations.signatures.buckets
      let dest_ips = resp.aggregations.dest_ips.buckets.slice(0,20)
      let source_ips = resp.aggregations.source_ips.buckets.slice(0,20)
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
      res.status(200).send(result.hits.hits)
    })
    .catch(err => {
      console.log(err)
      res.status(401).send(err.responses)
    })
  })
module.exports = router