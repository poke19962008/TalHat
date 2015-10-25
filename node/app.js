var express = require('express');
var fs = require('fs');
var mongo = require('./db/mongo.js').init();

var app = express();

function getQuery(req){
  var url = require('url');
  var url_parts = url.parse(req.url, true);
  return url_parts.query
}

app.get('/talhat/login/', function (req, res) {

  var query = getQuery(req);

  if(query['type'] == "login"){
    mongo.checkUser(query.mail, function result(err, docs){
      if(docs.found){
        mongo.getUser(query.mail, query.password, function result(err, docs){
          console.log(docs);
          if(docs.length == 0)
            res.send({"checkPassword": false});
          else {
              // set session
              res.send({"status": "everythins ok"});
            }
        });
      }else {
        res.send({"userExist": false});
      }
    });
  }

});

app.listen(3000, function (){
  console.log("Listening on port 3000");
})
