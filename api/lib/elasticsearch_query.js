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
          "format":"yyyy-MM-dd hh:mm:ss",
          "ranges":[
            {
              "from":"now-1h",
              "to":"now"
            }
          ]
        }
      }
    },
    "size": 1000
  }
  return queryString
}

exports.searchMultiTridentAlerts = (trident) => {
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
        },
        "aggs": {
          "source_ips": {
            "terms": {
              "field": "source_ip.keyword",
              "size": 10000,
              "order": {
                "_count": "desc"
              }
            },
            "aggs": {
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
    "size": 1000
  }
  return queryString
}

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