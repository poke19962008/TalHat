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
        console.log(docs);
        if(docs.length == 0)
          res.send({"checkPassword": false});
        else {
            // set session
            res.send({"status": "everythins ok"}); // testing
          }
      });
    }else {
      res.send({"userExist": false});
    }
  });

});

app.get('/signup', function (req, res){
  var query = getQuery(req);
});

app.listen(3000, function (){
  console.log("Listening on port 3000");
})
