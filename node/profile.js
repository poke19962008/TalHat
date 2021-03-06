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
  mongo.getAllPassions(function result(err, doc){
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
* Render the profile page
*/
app.get("/profile", function (req, res){
  var mail = req.session.mail;
  var pwd = req.session.password;

  if((mail != undefined) && (pwd != undefined)){

    mongo.verifyUser(mail, pwd, function result(err, docs){
      if(!docs.isValid)
        res.send({ "status": "not valid user"});
      else{
        mongo.getProfileData(mail, function result(err, profile){
          if(err){
            logger.log("info", "getProfileData | Mongo Retrieval Failed.");
            res.send({"status": "serverFault"});
          }

          res.render("profile.jade", profile);
        });
      }
    });

  }else{
    res.redirect("/signin");
  }
});

/**
* Increase the recognize counter
*/
app.get("/incRecognize", function (req, res){
  var mail = req.session.mail;
  var pwd = req.session.password;

  mong.verifyUser(mail, pwd, function result(err, docs){
    if(!docs.isValid)
      res.send("Invalid username pwd");
    else{
      var whoseMail = req.query.whoseMail;

      if(whoseMail == ""){
        res.send({ invalidParams: true });
      }else{
        var whomName = req.session.name;

        mongo.incRecognize(whoseMail, whomName, function result(err, doc){
          if(err){
            logger.log("info", "incRecognize | Mongo Retrieval Failed.");
            res.send({"status": "serverFault"});
          }
          res.send({ status: "success" });
        });
      }
    }
  });

});

/**
** TESTING
*/
// app.get("/test1", function (req, res){
//   res.send(req.session);
// });

exports.init = app;
