const es = require('elasticsearch')
const logger = require('../lib/log/bunyun')
const jwtRest = require('express-jwt')
const jwt = require('jsonwebtoken')
const requestLog = require('../lib/common').requestLog
const express = require('express')
const router = express.Router()

const client = new es.Client({
  host: process.env.ELASTIC_URL,
  // httpAuth: 'elastic:changeme',
  log: logger,
  requestTimeout: '60000'
})
const today = new Date()
const dd = ('0' + today.getDate()).slice(-2)
const mm = ('0' + (today.getMonth() + 1)).slice(-2) + '.'
const yyyy = today.getFullYear() + '.'
// const index = "logstash-2017.10.07"
const index = "logstash-" + yyyy + mm + dd

const uniqDescOrderedList = (array) => {
  let newSet = new Set(array.map(e => JSON.stringify(e)))
  let newOrder = Array.from(newSet).map(e => JSON.parse(e))
  newOrder.sort((a, b) => {
    if (a.doc_count) {
      return b.doc_count - a.doc_count
    } else if (a.timestamp) {
      return b.timestamp - a.timestamp
    } else {
      return a
    }
  })
  return newOrder
}

const mSearchObject = (obj) => {
  let queryString = {
    sort: [
      {
        "timestamp": {
          "order": "desc"
        }
      }
    ],
    "query": {
       "match": {
          "filename":{
            "query": "Trident2411"
          }
        }
    },
    "aggs": {
      "alerts_count": {
        "terms": {
          "field": "alert.signature.keyword",
          "size": 10000
        }
      }
    },
    "size": 1000
  }
  return queryString
}

const validateMiddleware = (req, res, next) => {
  if(!req.headers.authorization){
    log.error(requestLog(req, 401, 'No Authorization header'))
    res.status(401).send('No Authorization')
  }else if(req.headers.authorization && req.headers.authorization.split(' ')[0] != 'Bearer'){
    log.error(requestLog(req, 401, 'No Authorized Bearer'))
    res.status(401).send('Not Authorized')
  }else if(req.headers.authorization.split(' ')[1]){
    let token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded){
      if(err){
        log.error(requestLog(req, 401, 'Not Authorized Invalid token'))
        res.status(401).send('Not Authorized')
      } else if(decoded){
        next()
      }
    })
  }
}
router.get('/ping',
  function(req, res, next) {
    return client.ping({
      requestTimeout: 30000
    }, function(error) {
      if (error) {
        console.error('elasticsearch cluster is down');
      } else {
        console.log('All is well')
        res.status(200).send('All is well')
      }
    })
})

router.get('/',
  // validateMiddleware,
  // jwtRest({secret: process.env.JWT_SECRET}),
  function(req, res, next) {
    let queryArray = []
    console.log(req.query.trident)
    req.params.trident = []
    req.params.trident.push(req.query.trident)
    console.log(req.params)
    console.log(Array.isArray(req.params.trident))
    if (req.params.trident && Array.isArray(req.params.trident)) {
      req.params.trident.map((param, i) => {
        let trident = "Trident" + param
        let queryString = mSearchObject(trident)
        queryArray.push({}, queryString)
        return queryArray
      })
      let allAlerts = []
      let signatures = []
      return client.msearch({index, body: queryArray})
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

const mSearchMultiTridentAlerts = (trident) => {
  let queryString = {
    sort: [
      {
        "timestamp": {
          "order": "desc"
        }
      }
    ],
    query: {
      match: {
        filename: {
          query: trident
        }
      }
    },
    aggs: {
      signatures: {
        terms: {
          field: "alert.signature.keyword",
          size: 10000,
          order: {
            _count: "desc"
          }
        },
        aggs: {
          source_ips: {
            terms: {
              field: "source_ip.keyword",
              size: 10000,
              order: {
                _count: "desc"
              }
            },
            aggs: {
              "dest_ips": {
                "terms": {
                  "field": "destination_ip.keyword",
                  "size": 10000
                }
              }
            }
          }
        }
      }
    },
    size: 1000
  }
  return queryString
}

router.get('/alerts',
  validateMiddleware,
  jwtRest({secret: process.env.JWT_SECRET}),
  function(req, res, next) {
  let queryArray = []
  if (req.params.trident && Array.isArray(req.params.trident)) {
    req.params.trident.map((param, i) => {
      let trident = "Trident" + param
      let queryString = mSearchMultiTridentAlerts(trident)
      queryArray.push({}, queryString)
      return queryArray
    })
    return client.msearch({index, body: queryArray}).then(function(resp) {
      let alerts = resp.responses
      let signatures = [],
          currentAlerts = [],
          tempCurrentAlerts = []
      alerts.map(trident => {
        signatures.push(trident.aggregations.signatures.buckets)
        tempCurrentAlerts.push(trident.hits.hits)
      })
      let old_array = [],
        temp_array = [],
        new_array = [],
        ip_array = []
      let old_dest_array = [],
        temp_dest_array = [],
        new_dest_array = [],
        dest_array = []
      let k = 0
      signatures.forEach((bucket, i) => {
        bucket.forEach(source => {
          source.source_ips.buckets.forEach(ip => {
            old_array.push(ip)
            temp_array.push(ip)
            ip.dest_ips.buckets.forEach(dest => {
              old_dest_array.push(dest)
              temp_dest_array.push(dest)
            })
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
      currentAlerts = uniqDescOrderedList(tempCurrentAlerts)
      var body = {
        alerts: signatures,
        ips: ip_array,
        currentAlerts,
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

const mSearchSignatureObject = (trident) => {
  let queryString = {
    sort: [
      {
        "timestamp": {
          "order": "desc"
        }
      }
    ],
    "query": {
      "bool": {
        "must": [
          {
            "match": {
              "filename": trident
            }
          }
        ],
        "filter": [
          {
            "exists": {
              "field": "alert.signature.keyword"
            }
          }
        ]
      }
    },
    size: 1000
  }
  return queryString
}

const mSearchEventObject = (trident, type) => {
  let queryString = {
    sort: [
      {
        "timestamp": {
          "order": "desc"
        }
      }
    ],
    "query": {
      "bool": {
        "must": [
          {
            "match": {
              "filename": trident
            }
          }
        ],
        "filter": {
          "term": {
            "event_type": type
          }
        }
      }
    },
    "size": 1000
  }
  return queryString
}

router.get('/alerts/:type',
  validateMiddleware,
  jwtRest({secret: process.env.JWT_SECRET}),
  function(req, res, next) {
    let queryArray = []
    if (req.params.trident && Array.isArray(req.params.trident)) {
      req.params.trident.map((param, i) => {
        let trident = "Trident" + param
        let queryString = {}
        let type = req.params.type
        if (req.params.type == "signatures") {
          queryString = mSearchSignatureObject(trident)
        } else {
          queryString = mSearchEventObject(trident, type)
        }

        queryArray.push({}, queryString)
        return queryArray
      })
      return client.msearch({index, body: queryArray})
      .then(function(resp) {
        let alerts = resp.responses
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

const coordinatesSearch = (tridents) => {
  let queryString = {
    "sort": [
      {
        "timestamp": {
          "order": "desc"
        }
      }
    ],
    "query": {
      "match": {
        "filename": {
          "query": tridents
        }
      }
    },
    "aggs": {
      "lat": {
        "terms": {
          "field": "geoip.latitude",
          "size": 10000,
        },
        "aggs":{
          "long":{
            "terms":{
              "field": "geoip.longitude",
              "size": 10000
            }
          }
        }
      }
    },
    "size": 0
  }
  return queryString
}

const compileLatAndLongArray = (lat, longArray) => {
  let latAndLongArray = []
  longArray.map((long) => {
    latAndLongArray.push([lat,long.key,long.doc_count])
  })
  return latAndLongArray
}

router.get('/mapAlerts',
validateMiddleware,
jwtRest({secret: process.env.JWT_SECRET}),
function(req, res, next) {
  let queryArray = []
  if (req.params.trident && Array.isArray(req.params.trident)) {
    let tridents = ''
    req.params.trident.map((param, i) => {
      let trident = "Trident" + param + " ";
      tridents = tridents.concat(trident)
      return tridents
    })
    let queryString = coordinatesSearch(tridents)
    return client.search({index, body: queryString}).then(function(resp) {
      let coordsArray = []
      let latAndLongArray = []
      if (resp.aggregations && resp.aggregations.lat.buckets.length) {
        resp.aggregations.lat.buckets.map(lat => {
          latAndLongArray.push(compileLatAndLongArray(lat.key,lat.long.buckets))
        })
        coordsArray = [].concat(...latAndLongArray)
      }
      log.info(requestLog(req, 200))
      res.status(200).send(coordsArray)
    }).catch(function(err) {
      log.error(requestLog(req, 400, err.message))
      res.status(400).send(err.message)
    })
  }else{
    log.error(requestLog(req), 400, 'Params is not an array')
    res.status(400).send('Params is not an array')
  }
})

const locationAlerts = (lat,long,trident) => {
  let queryString = {
    "query": {
      "bool": {
        "must": [
          {"match": {"geoip.latitude":lat}},
          {"match": {"geoip.longitude":long}},
          {"match": {"filename": trident}}
        ]
      }
    },
    "size": 1000
  }
  return queryString
}

router.get('/mapAlerts/alert',
  validateMiddleware,
  jwtRest({secret: process.env.JWT_SECRET}),
  function(req, res, next) {
    let lat = req.params.lat
    let long = req.params.long
    if (req.params.trident && Array.isArray(req.params.trident)) {
      let tridents = ''
      req.params.trident.map((param, i) => {
        let trident = "Trident" + param + " ";
        tridents = tridents.concat(trident)
        return tridents
      })
      let queryString = locationAlerts(lat,long,tridents)
      return client.search({index, body: queryString}).then(function(resp) {
        let response = resp.hits.hits
        res.status(200).send(response)
      })
      .catch(err=>{
        log.error(requestLog(req, 400, err.message))
        res.status(400).send(err.message)
      })
    }else{
      log.error(requestLog(req, 'No tridents provided'))
      res.status(400).send('No tridents provided')
    }
  })

module.exports = router