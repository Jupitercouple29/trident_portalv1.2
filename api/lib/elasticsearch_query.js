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
    "size": 50
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
exports.searchEventObject = (trident, type) => {
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
exports.searchSignatureObject = (trident) => {
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
exports.searchObject = (obj, date, minusHour, startFrom) => {
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
          "format":"yyyy-MM-dd hh:mm:ss",
          "ranges":[
            {
              "from":minusHour,
              "to":date
            }
          ]
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
      }
    },
    from: startFrom,
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

/**
 * Elasticsearch query that retrieves the alerts pertaining to the given params
 * @param  {string} trident the trident
 * @param  {string} source  either source_ip or destination_ip
 * @param  {float} lat     the latitude
 * @param  {float} long    the longitude
 * @param  {array} ipArray an array o ips
 * @return {object}         returns an querystring object 
 */
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

/**
 * Elasticsearch string object that searches alerts by range
 * @param  {string} trident the trident
 * @param  {string} type    either source_ip or destination_ip
 * @param  {string} ipFrom  the starting ip range
 * @param  {string} ipTo    the ending ip range
 * @return {object}         returns a string object for elasticsearch query
 */
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
    "size": 1000
  }
  return queryString
}

/**
 * Elasticsearch string object to search for alerts by terms of IP's
 * @param  {string} trident the trident
 * @param  {string} type    either source_ip or destination_ip
 * @param  {array} ipArray the list of ips to search
 * @return {object}         returns a string object for elasticsearch
 */
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
              "filename": trident
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