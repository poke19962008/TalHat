/**
* This handles all the request from talhat.com/login page
*/

/**
* All the required files
*/
var app = require('./expressApp').port_3000;
var fs = require('fs');
var mongo = require('./db/mongo.js').init();
var winston = require('winston');
var auth = require('./auth');

/**
* All the configarations of the packages
*/
var logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)(),
      new (winston.transports.File)({ filename: 'log/login.log' })
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
app.get('/login', function (req, res) {

  var query = getQuery(req);

  query.password = auth.encrypt(query.password);

  mongo.checkUser(query.mail, function result(err, docs){ // check if mailID exists in DB
    if(docs.found){
      mongo.verifyUser(query.mail, query.password, function result(err, docs){ // Check if the password is correct

        if(!docs.isValid)
          res.send({"checkPassword": false});
        else {
            logger.log("info", "login | logged in ->", query.mail);

            mongo.getName(query.mail, function result(err, doc){
              req.session.mail = query.mail;
              req.session.password = query.password;
              req.session.name = doc.name;
              
              req.session.save(function (err){
                if(err)
                  res.send({"status": "failed"});
                else
                  res.send({"status": "success"});
              });
            });
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
      mongo.checkPassionExist( query.passion, function (result){ // check if passion exist in DB
        if(result.found){
          mongo.insertData( // Insert data
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
              res.send({"status": "success"});
            }
          });
        }
        else {
          res.send({"status": "PassionNotExist"})
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


/**
** TESTING
*/
// app.get("/test", function (req, res){
//   mongo.getName("test@test.com", function result(err, doc){
//     res.send(doc)
//   })
// });

exports.init = app;
