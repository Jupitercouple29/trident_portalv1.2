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

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(validator());

app.use('/users', users);
app.use('/trident', trident);
app.use('/map', map);

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