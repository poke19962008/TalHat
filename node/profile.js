/*
* This handles all the request from talhat.com/profile page
*/


/**
* All the required files
*/

var app = require('./expressApp').port_3000;
var fs = require('fs');
var mongo = require('./db/mongo.js').init();
var winston = require('winston');


/**
* All the configarations of the packages
*/
var logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)(),
      new (winston.transports.File)({ filename: 'log/profile.log' })
    ]
  });


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


/**
** TESTING
*/
// app.get("/test1", function (req, res){
//   res.send(req.session.test);
//   console.log(req.session);
// });

exports.init = app;
