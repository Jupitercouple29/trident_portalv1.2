var express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    winston = require('winston'),
    helmet = require('helmet'),
    compression = require('compression'),
    validator = require('express-validator'),
    jwt = require('express-jwt'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    cors = require('cors');

var users = require('./routes/users');
var trident = require('./routes/trident')
var map = require('./routes/map')
var reports = require('./routes/reports')
var soc = require('./routes/soc')

var app = express();

app.use(logger('dev'));
app.use('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Accept, Origin, Content-Type, access_token');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});
app.use(bodyParser.raw({type:'application/pdf', limit:'10mb'}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(validator());

app.use('/users', users);
app.use('/trident', trident);
app.use('/map', map);
app.use('/reports', reports);
app.use('/soc', soc)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
   res.send({
        message: err.message,
        error: err
    });
   return;
});

module.exports = app