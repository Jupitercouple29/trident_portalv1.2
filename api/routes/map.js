const jwtRest = require('express-jwt')
const jwt = require('jsonwebtoken')
const express = require('express')
const { requestLog } = require('../lib/common')
const { validateMiddleware } = require('../lib/common')
const { compileLatAndLongArray } = require('../lib/common')
const { locationAlerts } = require('../lib/elasticsearch_query') 
const { coordinatesSearch } = require('../lib/elasticsearch_query')

const router = express.Router()

const today = new Date()
const dd = ('0' + today.getDate()).slice(-2)
const mm = ('0' + (today.getMonth() + 1)).slice(-2) + '.'
const yyyy = today.getFullYear() + '.'
// const index = "logstash-2017.10.07"
const index = "logstash-" + yyyy + mm + dd

router.get('/alerts',
// validateMiddleware,
// jwtRest({secret: process.env.JWT_SECRET}),
function(req, res, next) {
  let queryArray = []
  if (req.query.trident && Array.isArray(req.query.trident)) {
    let tridents = ''
    req.query.trident.map((param, i) => {
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

router.get('/alerts/alert',
  // validateMiddleware,
  // jwtRest({secret: process.env.JWT_SECRET}),
  function(req, res, next) {
    let lat = req.query.lat
    let long = req.query.long
    if (req.query.trident && Array.isArray(req.query.trident)) {
      let tridents = ''
      req.query.trident.map((param, i) => {
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