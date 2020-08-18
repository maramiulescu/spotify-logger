var createError = require('http-errors');
var express = require('express');
var request = require('request');
var path = require('path');
var cookieParser = require('cookie-parser');
var querystring = require('querystring');
var logger = require('morgan');
var cors = require('cors');
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loggerAPIRouter = require('./routes/loggerAPI');
var loginRouter = require('./routes/login');
var callbackRouter = require('./routes/callback');
var refreshTokenRouter = require('./routes/refreshToken');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/loggerAPI', loggerAPIRouter);
app.use('/login', loginRouter);
app.use('/callback', callbackRouter);
app.use('/refreshToken', refreshTokenRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
