/**
* All the express app module listening on various port
*/

/**
* All the required files
*/
var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var config = require('./config').load()['session'];

var app_3000 = express();

/**
** Set all the express middlewares
*/
app_3000.use(cookieParser());
app_3000.use(session({
  secret: config.key,
  saveUninitialized: true,
  resave: true
}));

/**
* Start the server on 3000
*/
app_3000.listen(3000, function (){
  console.log("listening on port 3000");
});

exports.port_3000 = app_3000;
