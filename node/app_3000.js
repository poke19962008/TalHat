var express = require('express');
var fs = require('fs');
var mongo = require('./db/mongo.js').init();

var app = express();

function getQuery(req){ // Parse the url for parameters
  var url = require('url');
  var url_parts = url.parse(req.url, true);
  return url_parts.query
}

app.get('/login/', function (req, res) {

  var query = getQuery(req);

  mongo.checkUser(query.mail, function result(err, docs){ // check if mailID exists in DB
    if(docs.found){
      mongo.getUser(query.mail, query.password, function result(err, docs){ // Check if the password is correct

        if(docs.length == 0)
          res.send({"checkPassword": false});
        else {
            // set session
            // and redirect to profile page
            console.log("[SUCCESS]"+query.mail+" logged in.");
            res.send({"status": "success"}); // testing
          }
      });
    }else {
      console.log("[ERROR] "+query.mail+" entered wrong credentials.");
      res.send({"userExist": false});
    }
  });

});

app.get('/signup', function (req, res){
  var query = getQuery(req);

  mongo.checkUser(query.mail, function result(err, docs){
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
          console.log("[ERROR] "+query.mail+" insertion failed.");
          res.send({"status": "serverFault"});
        }
        else {
          console.log("[SUCCESS] "+query.mail+" insertion successfull.");
          res.send({"status":  "success"});
      }

      });
    }
  });
});

app.listen(3000, function (){
  console.log("Listening on port 3000");
  console.log("This port accepts requests for login and signup.");

  /* TEST: Mongo queries */
  // mongo.getAllPassion();
  // mongo.getPassion("poke19962008@gmail.com", function result(err, doc){
  //   console.log(doc);
  // });
})
