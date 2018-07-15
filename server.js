var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

var index = require('./routes/index');
var users = require('./routes/users');
var kids = require('./routes/kids');

var port = 4200;

var app = express();

// Connect To Database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database '+config.database);
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+err);
});

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Set Static Folder
app.use(express.static(path.join(__dirname, 'client')));

// Set Static Folder for assets
app.use('/assets',express.static(path.join(__dirname, '/assets')));
app.use('/assets/videos',express.static(path.join(__dirname, '/assets/videos')));

// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/', index);
app.use('/api', users);
app.use('/api', kids);
app.use('*', index);

app.listen(port, function(){
    console.log('Server started on port '+port);
});