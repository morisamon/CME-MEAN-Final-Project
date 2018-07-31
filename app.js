var createError = require('http-errors');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
const passport = require('passport');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cme')
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

var index = require('./routes/index');
var users = require('./routes/users');
var kids = require('./routes/kids');
var sessions = require('./routes/sessions');

var app = express();

// Set Static Folder for assets
app.use('/assets',express.static(path.join(__dirname, '/assets')));
app.use('/assets/videos',express.static(path.join(__dirname, '/assets/videos')));
app.use('/assets/voices',express.static(path.join(__dirname, '/assets/voices')));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist/mean-angular6')));
app.use('/', express.static(path.join(__dirname, 'dist/mean-angular6')));
app.use('/api', users);
app.use('/api', kids);
app.use('/api', sessions);
app.use('*', express.static(path.join(__dirname, 'dist/mean-angular6')));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

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
  res.send(err.status);
});

module.exports = app;
