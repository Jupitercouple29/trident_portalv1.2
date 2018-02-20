/**
 * Elasticsearch query to get result of a trident search
 * @param  {string} trident  the trident
 * @param  {number} from  start search from this location
 * @return {array}  returns alerts for trident given
 */
exports.searchTrident = (trident, from, type, ip) => {
  let term = {}
  term[type] = ip
  let queryString = {
    "sort": [
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
        ]
      }
    },
    "from":from,
    "size": 1000
  }
  return queryString
}

/**
 * Elasticsearch query for getting the coordinates of all the 
 * alerts pertaining to the trident/s passed in
 * @param  {tridents}  trident or tridents (ex. Trident 2411 Trident 2402)
 * @return {queryString}  returns the querystring
 */
exports.coordinatesSearch = (tridents) => {
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
        "filename": tridents
      }
    },
    "aggs": {
      "lat": {
        "terms": {
          "field": "geoip.latitude",
          "size": 10000
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

/**
 * Elasticsearch query that searches the given trident for all
 * that have the event_type of the type passed in.
 * @param  {trident}  trident (ex. Trident 2411)
 * @param  {type}  ex. dns
 * @return {queryString}  returns queryString
 */
exports.searchEventObject = (trident, type, startFrom) => {
  let queryString = {
    "sort": [
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
    "from": startFrom,
    "size": 1000
  }
  return queryString
}

/**
 * Elasticsearch query that finds all signature alerts for 
 * the given trident
 * @param  {trident}  trident (ex. Trident 2411)
 * @return {queryString}
 */
exports.searchSignatureObject = (trident, startFrom) => {
  let queryString = {
    "sort": [
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
    from: startFrom,
    "size": 1000
  }
  return queryString
}

/**
 * Elasticsearch query that gathers signature alerts and alerts last hour
 * for the trident/s provided by the obj field
 * @param  {obj}  trident/s (ex. Trident 2411 Trident 2402)
 * @param  {date}  date
 * @param  {minusHour} date minus 1 hour
 * @return {queryString} returns the querystring
 */
exports.searchObject = (obj, date, minusHour) => {
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
          "filename": obj
        }
    },
    "aggs": {
      "signature_alerts": {
        "terms": {
          "field": "alert.signature.keyword",
          "size": 10000
        }
      },
      "alerts_last_hour":{
        "date_range":{
          "field":"timestamp",
          "format":"yyyy-MM-dd, hh:mm:ss",
          "ranges":[
            {
              "from":now - 1h,
              "to":now
            }
          ]
        }
      }
    },
    "size": 1000
  }
  return queryString
}

/**
 * Elasticsearch query that gathers signature alerts, destination ips,
 * and source ips based on the trident passed in 
 * @param  {trident} trident (ex. Trident 2411)
 * @return {queryString}
 */
exports.searchTridentAlerts = (trident) => {
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
        "filename": {
          "query": trident
        }
      }
    },
    "aggs": {
      "signatures": {
        "terms": {
          "field": "alert.signature.keyword",
          "size": 10000,
          "order": {
            "_count": "desc"
          }
        }
      },
      "source_ips": {
        "terms": {
          "field": "source_ip.keyword",
          "size": 10000,
          "order": {
            "_count": "desc"
          }
        }
      },
      "dest_ips": {
        "terms": {
          "field": "destination_ip.keyword",
          "size": 10000
        }
      }
    },
    "size": 1000
  }
  return queryString
}

/**
 * Elasticsearch query that gets all alerts based on the latitude,
 * longitude, and trident values
 * @param  {lat}  latitude
 * @param  {long}  longitude
 * @param  {trident}  trident 
 * @return {queryString} queryString
 */
exports.locationAlerts = (lat,long,trident) => {
  let queryString = {
    "sort":[
      {
        "timestamp":{
          "order": "desc"
        }
      }
    ],
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

exports.clientMapAlert = (trident, source, lat, long, ipArray) => {
  let terms = {}
  terms[source] = ipArray
  let queryString = {
    "sort":[
      {
        "timestamp":{
          "order": "desc"
        }
      }
    ],
    "query": {
      "bool": {
        "must": [
          {"match": {"geoip.latitude":lat}},
          {"match": {"geoip.longitude":long}},
          {"match": {"filename": trident}}
        ],
        "filter":{
          "terms": terms
        }
      }
    },
    "size": 1000
  }
  return queryString
}

/**
 * Elasticsearch query that simply is used to get the total
 * number of alerts for the given trident
 * @param  {trident}  trident
 * @return {queryString}  queryString
 */
exports.mSearchNumOfAlerts = (trident) => {
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
        "filename": trident
      }
    },
    "size": 10
  }
  return queryString
}

/**
 * Elasticsearch query that gathers alert info based on a clicked item
 * (ex. source_ips = 10.10.222.234 where title is source_ip and info is 10.10.222.234)
 * @param  {trident} trident
 * @param  {title}  the name of the item to query
 * @param  {info}  the exact info to query against 
 * @return {queryString}
 */
exports.searchItemClicked = (trident, title, info) => {
  let itemMatch = {}
  itemMatch[title] = info
  let queryString = {
    "sort": [
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
          },
          {
            "match": itemMatch
          }
        ]
      }
    },
    "size":1000
  }
  return queryString
}

exports.searchRangeByIPs = (trident, type, ipFrom, ipTo) => {
  let range = {}
  range[type] = {
    "gte": ipFrom,
    "lte": ipTo
  }
  let queryString = {
    "sort":[
      {
        "timestamp":{
          "order": "desc"
        }
      }
    ],
    "query":{
      "bool":{
        "must":[
          {
            "match":{
              "filename": trident
            }
          }
        ],
        "filter":{range} 
        
      }
    },
    "size": 10000
  }
  return queryString
}

exports.searchByIPs = (trident, type, ipArray) => {
  let terms ={}
  terms[type] = ipArray
  let queryString = {
    "sort":[
      {
        "timestamp":{
          "order": "desc"
        }
      }
    ],
    "query":{
      "bool":{
        "must":[
          {
            "match":{
              "filename": "Trident2426"
            }
          }
        ],
        "filter":{ 
          terms: terms
        }
      }
    },
    "aggs": {
      "lat": {
        "terms": {
          "field": "geoip.latitude",
          "size": 10000
        },
        "aggs":{
          "long":{
            "terms":{
              "field": "geoip.longitude",
              "size": 10000
            }
          }
        }
      },
       "signatures": {
        "terms": {
          "field": "alert.signature.keyword",
          "size": 10000,
          "order": {
            "_count": "desc"
          }
        }
      },
      "source_ips": {
        "terms": {
          "field": "source_ip.keyword",
          "size": 10000,
          "order": {
            "_count": "desc"
          }
        }
      },
      "dest_ips": {
        "terms": {
          "field": "destination_ip.keyword",
          "size": 10000,
          "order":{
            "_count": "desc"
          }
        }
      }
    },
    "size": 5000
  }
  return queryString
}