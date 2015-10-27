// This is for Global Mongo Queries

var mongoClient = require('mongodb').MongoClient;
var config=require('../config.js').load()["mongodb"];

var collection = config['collection'];
var url = config['mongo_path'];

var queries = {
  "getUser": function (mail, password, result){
    mongoClient.connect(url, function(err, db) {
      var cur = db.collection('user_details').find({"mail": mail, "password": password});
      cur.toArray(function (err, docs){ result(err, docs); });
    });
  },

  "checkUser": function (mail, result){
    mongoClient.connect(url, function (err, db){
      var cur = db.collection('user_details').find({ "mail": mail });

      cur.toArray(function (err, docs){
        if(docs.length) result(err, {"found": true});
        else result(err, {"found": false});
      });
    });
  },

  "insertData": function (mail, password, passion, name, result){
    mongoClient.connect(url,  function (err, db){
      var cur = db.collection('user_details').insert({
        "mail": mail,
        "password": password,
        "passion": passion,
        "name": name
      }, function (err, results){
        result(err);
      });
    });
  },
  "getAllPassion": function (result){
    mongoClient.connect(url , function (err, db){
      var cur = db.collection('passions').find();

      cur.toArray(function (err, docs){
        result(err, docs);
      });
    });
    return ;
  },

  "getPassion": function (mail){

  }

};

function init(){
  return queries;
}

exports.init = init;
