var cookieParser = require('cookie-parser');
var session = require('express-session');
var express = require('express');

var app =express();

app.use(cookieParser());
app.use(session({
  secret: 'test',
  saveUninitialized: true,
  resave: true
}));

app.get("/", function(req, res){
  req.session.name = "apple";
  res.send("<a href=\"/\">click</a>");
});

app.get("/test", function (req, res){
  // console.log(req.session.name);/
  res.send(req.session.name);
});

app.listen(8000, function (){
  console.log("listening on 8000");
});

var app2 = express();

app2.use(cookieParser());
app2.use(session({
  secret: 'test',
  saveUninitialized: true,
  resave: true
}));

app2.get("/", function (req, res){
  res.send(req.session.name);
});

app2.listen(7000, function (){
  console.log("listening on 7000");
});
