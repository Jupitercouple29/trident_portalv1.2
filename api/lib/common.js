exports.requestLog = function(req, status, mes){
  let url = req.url.slice(0, req.url.indexOf('?'))
  let method = req.method
  let date = new Date().toDateString()
  let message = mes ? mes : ''

  let log = url + ' ' + method + ' ' + status + ' ' + date + ' ' + message
  return log
}

exports.compileLatAndLongArray = (lat, longArray) => {
  let latAndLongArray = []
  longArray.map((long) => {
    latAndLongArray.push([lat,long.key,long.doc_count])
  })
  return latAndLongArray
}

exports.uniqDescOrderedList = (array) => {
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

exports.validateMiddleware = (req, res, next) => {
  var jwt = require('jsonwebtoken')
  console.log(req.headers)
  if(req.body && req.body.headers){
    req.headers.authorization = req.body.headers.Authorization
  }
	// console.log('inside of validateMiddleware')
  if(!req.headers.authorization){
    console.log('no authorization headers')
    log.error(requestLog(req, 401, 'No Authorization header'))
    res.status(401).send('No Authorization')
  }else if(req.headers.authorization && req.headers.authorization.split(' ')[0] != 'Bearer'){
    console.log('no authorization Bearer')
    log.error(requestLog(req, 401, 'No Authorized Bearer'))
    res.status(401).send('Not Authorized')
  }else if(req.headers.authorization.split(' ')[1]){
    let token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded){
      if(err){
        console.log('Not Authorized Invalid token')
        log.error(requestLog(req, 401, 'Not Authorized Invalid token'))
        res.status(401).send('Not Authorized')
      } else if(decoded){
        next()
      }
    })
  }
}

exports.validateEmail = (email) => {
  var re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
  return re.test(email);
}