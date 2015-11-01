/**
* All the express app module listening on various port
*/

/**
* All the required files
*/
var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);

var sess_config = require('./config').load()['session'];
var mongo_config = require('./config').load()['mongodb'];


/**
** All the express apps
*/
var app_3000 = express();

/**
** Set all the express middlewares
*/
var expiration = 360000;
app_3000.use(cookieParser());
app_3000.use(session({        // Session configs
  secret: sess_config.key,
  saveUninitialized: true,
  resave: true,

  cookie: {                  // Cookie configs
    expires: new Date(Date.now() + expiration),
    maxAge: expiration,
  },

  store: new mongoStore({     // Mongo Store configs
    url: mongo_config.mongo_path,
    autoRemove: 'native', // Remove all the expired sessions
    collection: 'session', // COllection name 
  }),
}));

/**
* Start the server on 3000
*/
app_3000.listen(3000, function (){
  console.log("listening on port 3000");
});

exports.port_3000 = app_3000;
