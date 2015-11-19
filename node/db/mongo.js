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
    var initBio =  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, ut porta lorem lacinia consectetur. Donec ut libero sed arcu vehicula ultricies a non tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut gravida lorem. Ut turpis felis, pulvinar a semper sed, adipiscing id dolor. Pellentesque auctor nisi id magna consequat sagittis. Curabitur dapibus enim sit amet elit pharetra tincidunt feugiat nisl imperdiet. Ut convallis libero in urna ultrices accumsan. Donec sed odio eros. Donec viverra mi quis quam pulvinar at malesuada arcu rhoncus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In rutrum accumsan ultricies. Mauris vitae nisi at sem facilisis semper ac in est.";

    mongoClient.connect(url,  function (err, db){
      var cur = db.collection('user_details').insert({
        "mail": mail,
        "password": password,
        "passion": passion,
        "name": name,
        "bio": initBio,
      }, function (err, results){
        result(err);
      });


      var cur = db.collection('passions').update({"passion": passion}, {$inc : {"count": 1}});

    });
  },

  "getAllPassion": function (result){
    mongoClient.connect(url , function (err, db){

      var cur = db.collection('passions').find({}, {
        "passion": true,
        "_id": false
      });

      cur.toArray(function (err, docs){
        var data = {};
        data.passions = [];

        for (var i = 0; i < docs.length; i++)
          data.passions.push(docs[i].passion);

        result(err, data);
      });
    });
    return ;
  },

  "getPassion": function (mail, result){

    mongoClient.connect(url, function (err, db){
      var cur = db.collection('user_details').find({
        "mail": mail
      },{
        "passion": true,
        "_id": false
      });

      cur.toArray(function (err, docs){
        result(err, docs[0]);
      });
    });
  },

  "getPassionWithKeywords": function (keyword, result){
    mongoClient.connect(url, function (err, db){
      var cur = db.collection('passions').find({
        "passion":{
          $regex: "^"+keyword,
          $options: "i"
        }
      },{
        "_id": false,
        "passion": true,
        "count": true,
      });

      cur.toArray(function (err, docs){
        result(err, docs);
      });
    });
  },

  "getPassionforProfile": function (result){
    mongoClient.connect(url, function (err, db){
      var cur = db.collection('passions').find({}, {
        "_id": false,
      });
      cur.toArray(function (err, docs){
        result(err, docs);
      });
    });
  },

  "checkPassionExist": function (passion, result){
    mongoClient.connect(url, function (err, db){
      var cur = db.collection('passions').find({
        "passion": passion,
      },{
        "_id": false,
        "count": false,
      });

      cur.toArray(function (err, docs){
        if(docs.length == 0)
          result({ "found": false });
        else
          result({ "found": true });
      });

    });
  },

  "getProfileData": function (mail, result) {
    mongoClient.connect(url, function (err, db){
      var cur = db.collection('user_details').find({
        "mail": mail,
      },
      {
        "_id": false,
        "password": false,
      });

      cur.count(function (err, count){

        if(count == 0)
          result({ "found":  false });
        else if(count == 1){
          cur.toArray(function (err, docs){
            result(docs[0]);
          });
        }

      });

    });
  },

};

function init(){
  return queries;
}

exports.init = init;
