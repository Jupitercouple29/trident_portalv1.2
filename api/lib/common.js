// module.exports = {
//   requestLog: requestLog(),
//   getSome: getSome()
// }

exports.requestLog = function(req, status, mes){
  let url = req.url.slice(0, req.url.indexOf('?'))
  let method = req.method
  let date = new Date().toDateString()
  let message = mes ? mes : ''

  let log = url + ' ' + method + ' ' + status + ' ' + date + ' ' + message
  return log
}

exports.getSome = function(some){
  return some
}
