var express = require('express');
var fs = require('fs');
var mongo = require('./db/mongo.js').init();


var app = express();


app.get('/talhat/login/index.html', function (req, res) {
  mongo.getUser("poke19962008", "dass", function result(err, docs){
    res.send(docs[0]);
  });

});

app.listen(3000, function (){
  console.log("Listening on port 3000");
})
