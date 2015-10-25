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

};

function init(){
  return queries;
}

exports.init = init;
