var express = require('express');
var fs = require('fs');
var app = express();

app.use(express.static(__dirname + "/static"))

app.get('/talhat', function (req, res) {
  console.log("working");
});

app.listen(3000, function (){
  console.log("Listening on port 3000");
})
