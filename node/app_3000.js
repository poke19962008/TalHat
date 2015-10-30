/*
* This handles all the request from talhat.com/login page
*/

var express = require('express');
var fs = require('fs');
var mongo = require('./db/mongo.js').init();
var winston = require('winston');
var auth = require('./auth');

var logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)(),
      new (winston.transports.File)({ filename: 'log/port3000.log' })
    ]
  });

var app = express();

function getQuery(req){ // Parse the url for parameters
  var url = require('url');
  var url_parts = url.parse(req.url, true);
  return url_parts.query
}

app.get('/login', function (req, res) {

  var query = getQuery(req);

  query.password = auth.encrypt(query.password);

  mongo.checkUser(query.mail, function result(err, docs){ // check if mailID exists in DB
    if(docs.found){
      mongo.getUser(query.mail, query.password, function result(err, docs){ // Check if the password is correct

        if(docs.length == 0)
          res.send({"checkPassword": false});
        else {
            // set session
            // and redirect to profile page
            logger.log("info", "login | logged in ->", query.mail);
            res.send({"status": "success"}); // testing
          }
      });
    }else {
      logger.log("info" ,"login | wrong credential ->", query.mail);
      res.send({"userExist": false});
    }
  });

});

app.get('/signup', function (req, res){
  var query = getQuery(req);

  query.password = auth.encrypt(query.password);

  mongo.checkUser(query.mail, function result(err, docs){ // Check if already user exist
    if(docs.found)
      res.send({ "userExist": true });
    else {
      mongo.insertData(
        query.mail,
        query.password,
        query.passion,
        query.name
      , function result(err){
        if(err){
          logger.log("error", "signup | mongo insertion failed ->", query.mail);
          res.send({"status": "serverFault"});
        }
        else {
          logger.log("info" ,"signup | new user ->", query.mail);
          res.send({"status":  "success"});
      }

      });
    }
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

app.listen(3000, function (){
  logger.log("info" ,"SERVER STARTED");
  console.log("Listening on port 3000");

  console.log("This port accepts requests for login and signup.");

  /* TEST: Mongo queries */
  // mongo.getAllPassion(function result(err, docs){
  //   console.log(docs);
  // });
  // mongo.getPassion("poke19962008@gmail.com", function result(err, doc){
  //   console.log(doc);
  // });
  // mongo.getPassionWithKeywords("co", function result(err, docs){
  //   console.log(docs);
  // });
  // mongo.getPassionforProfile(function result(err, doc){
  //   console.log(doc);
  // });
});

exports.init = app;
