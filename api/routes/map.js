const jwtRest = require('express-jwt')
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

/**
 * Gathers the coordinates of the alerts pertaining to the trident/s
 * that is passed in by req.query
 * @param {array} req.query.trident  the trident/s to be querried
 * @return {array} returns all coordinates of the alerts pertaining to the trident
 */
router.get('/alerts',
validateMiddleware,
jwtRest({secret: process.env.JWT_SECRET}),
function(req, res, next) {
  let queryArray = []
  if (req.query.trident && Array.isArray(req.query.trident)) {
    let tridents = ''
    //forms a concatenated list of tridents ex. "Trident2411 Trident2422"
    req.query.trident.map((param, i) => {
      let trident = "Trident" + param + " ";
      tridents = tridents.concat(trident)
      return tridents
    })
    //elasticsearch query param
    let queryString = coordinatesSearch(tridents)
    let day = new Date(req.query.queryDate)
    let dd = ('0' + day.getDate()).slice(-2)
    let mm = ('0' + (day.getMonth() + 1)).slice(-2) + '.'
    let yyyy = day.getFullYear() + '.'
    let queryIndex = "logstash-" + yyyy + mm + dd
    //elasticsearch search query that returns two buckets. One for the latitude and
    // one for the longitude.
    return client.search({index:queryIndex, body: queryString}).then(function(resp) {
      let coordsArray = []
      let latAndLongArray = []
      if (resp.aggregations && resp.aggregations.lat.buckets.length) {
        resp.aggregations.lat.buckets.map(lat => {
          //creates an array of lat and long values from the elasticsearch aggregations
          latAndLongArray.push(compileLatAndLongArray(lat.key,lat.long.buckets))
        })
        //concatenates all the arrays of lat and long into one array
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

/**
 * Gathers all alerts pertaining to a specific geo location
 * @param  {float}  req.query.lat   the latitude
 * @param  {float}  req.query.long  the longitude
 * @param  {array}  req.query.trident   the trident to be querried
 * @return {array}  returns an array of alerts fitting the requested values
 */
router.get('/alerts/alert',
  validateMiddleware,
  jwtRest({secret: process.env.JWT_SECRET}),
  function(req, res, next) {
    let lat = req.query.lat
    let long = req.query.long
    if (req.query.trident && Array.isArray(req.query.trident)) {
      let tridents = ''
      //forms a concatenated list of tridents ex. "Trident2411 Trident2422"
      req.query.trident.map((param, i) => {
        let trident = "Trident" + param + " ";
        tridents = tridents.concat(trident)
        return tridents
      })
      //elasticsearch query param
      let queryString = locationAlerts(lat,long,tridents)
      return client.search({index, body: queryString}).then(function(resp) {
        // elasticsearch results 
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