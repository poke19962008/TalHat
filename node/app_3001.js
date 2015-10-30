/*
* This handles all the request from talhat.com/profile page
*/


/**
* All the required files
*/
var express = require('express');
var fs = require('fs');
var mongo = require('./db/mongo.js').init();
var winston = require('winston');
var session = require('express-session');
var config = require('./config').load()['session'];


/**
* All the configarations of the packages
*/
var logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)(),
      new (winston.transports.File)({ filename: 'log/port3001.log' })
    ]
  });

var app = express();
app.use(session({secret: config.key}));

/**
* All the globally accessible functions
*/
function getQuery(req){ // Parse the url for parameters
  var url = require('url');
  var url_parts = url.parse(req.url, true);
  return url_parts.query
}

/**
* All the GET request accessible from this server port
*/
app.get("/getPassionsforProfile", function (req, res){
  mongo.getPassionforProfile(function result(err, doc){
    res.send(doc);
  });
});

app.get("/getPassionsWithKeywords", function (req, res){ // Return keywords when the user start typing his/her passion
  var query = getQuery(req);

  mongo.getPassionWithKeywords( query.keyword, function result(err, docs){
    if(err){
      logger.log("info", "getPassionsWithKeywords | Mongo Retrieval Failed.");
      res.send({"status": "serverFault"});
  }
    else res.send(docs);
  });

});

app.get("/test", function (req, res){
  console.log(req.session);

});

/**
* Start the server on 3000
*/
app.listen(3001, function (){
  logger.log("info" ,"SERVER STARTED");
  console.log("Listening on port 3001");

  console.log("This port accepts requests for profile.");
})
