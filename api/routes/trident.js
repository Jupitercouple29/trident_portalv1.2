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
  if (req.query.trident && Array.isArray(req.query.trident)) {
    let tridentString = ''
    req.query.trident.map((param, i) => {
      let trident = "Trident" + param + ' '
      tridentString += trident
    })
    let queryString = searchMultiTridentAlerts(tridentString)
    return client.search({index, body: queryString})
    .then(function(resp) {
      let alerts = resp.hits.hits
      let signatureAlerts = resp.aggregations.signatures.buckets
      let old_array = [],
        temp_array = [],
        new_array = [],
        ip_array = []
      let old_dest_array = [],
        temp_dest_array = [],
        new_dest_array = [],
        dest_array = []
      let k = 0
      signatureAlerts.forEach(bucket => {
        bucket.source_ips.buckets.forEach(ip => {
          old_array.push(ip)
          temp_array.push(ip)
          ip.dest_ips.buckets.forEach(dest => {
            old_dest_array.push(dest)
            temp_dest_array.push(dest)
          })
        })
      })
      for (var i = 0; i < old_array.length; i++) {
        new_array[i] = {}
        new_array[i].doc_count = 0
        for (var j = 0; j < temp_array.length; j++) {
          if (old_array[i].key === temp_array[j].key) {
            new_array[i].key = old_array[i].key
            new_array[i].doc_count += temp_array[j].doc_count
          }
        }
      }
      for (var i = 0; i < old_dest_array.length; i++) {
        new_dest_array[i] = {}
        new_dest_array[i].doc_count = 0
        for (var j = 0; j < temp_dest_array.length; j++) {
          if (old_dest_array[i].key === temp_dest_array[j].key) {
            new_dest_array[i].key = old_dest_array[i].key
            new_dest_array[i].doc_count += temp_dest_array[j].doc_count
          }
        }
      }
      ip_array = uniqDescOrderedList(new_array)
      dest_array = uniqDescOrderedList(new_dest_array)
      var body = {
        alerts: alerts,
        ips: ip_array,
        signatureAlerts,
        dest_ips: dest_array
      }
      log.info(requestLog(req, 200))
      res.status(200).send(body)
    }).catch(function(err) {
      log.error(requestLog(req, 400, err.message))
      res.status(400).send(err.message)
    })
  } else {
    log.error(requestLog(req, 400, 'No tridents provided'))
    res.status(400).send("No Tridents")
  }
})

router.get('/alerts/:type',
  // validateMiddleware,
  // jwtRest({secret: process.env.JWT_SECRET}),
  function(req, res, next) {
    let queryArray = []
    if (req.query.trident && Array.isArray(req.query.trident)) {
      let queryString = ''
      let tridentString = ''
      let type = req.params.type
      req.query.trident.map((param, i) => {
        let trident = "Trident" + param + " "
        tridentString += trident        
      })
      if (req.params.type == "signatures") {
          queryString = searchSignatureObject(tridentString)
        } else {
          queryString = searchEventObject(tridentString, type)
        }
      return client.search({index, body: queryString})
      .then(function(resp) {
        let alerts = resp.hits.hits
        let body = {
          alerts
        }
        log.info(requestLog(req, 200))
        res.status(200).send(body)
      }).catch(function(err) {
        log.error(requestLog(req, 400, err.message))
        res.status(400).send(err.message)
      })
    } else {
      log.error(requestLog(req, 'No tridents provided'))
      res.status(400).send('No tridents provided')
    }
})

router.get('/count', 
	// validateMiddleware,
	// jwtRest.({secret: process.env.JWT_SECRET}),
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
      }).catch(function(err) {
        log.error(requestLog(req, 400, err.message))
        res.status(400).send(err.message)
      })
    } else {
      log.error(requestLog(req, 'No tridents provided'))
      res.status(400).send('No tridents provided')
    }
	})

module.exports = router