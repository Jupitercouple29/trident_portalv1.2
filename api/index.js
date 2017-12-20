var express = require('express');
var path = require('path');
var logger = require('morgan');
var winston = require('winston');
var helmet = require('helmet');
var compression = require('compression');
var validator = require('express-validator');
var jwt = require('express-jwt');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var users = require('./routes/users');
var trident = require('./routes/trident')

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(helmet());
app.use(validator());

app.use('/users', users);
app.use('/trident', trident);

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