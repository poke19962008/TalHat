/*
  Wrong Password -> "checkPassword": false
  Success ->"status": "success"
  User exists -> "userExists":  false
  Server fault -> "status" : "Server Fault"
*/

var nodeHost = "http://localhost:3000/"; // TODO: add closure on it

$("#login_submit").click(function (){
  var password = $("#login_pass").val();
  var mail = $("#login_mail").val();
  var data = {};

  data["password"] = password;
  data["mail"] =  mail;
  data['type'] = "login";

  $.getJSON(nodeHost + "login/", data, function (data) {

  });

});

$("#signup_submit").click(function () {
  var data = {};

  data['name'] = $("#signup_name").val();
  data['passion'] = $("#signup_passion").val();
  data['mail'] = $("#signup_mail").val();
  data['password'] = $("#signup_password").val();
  data['rep_password'] = $("#signup_rep_password").val();

  $.getJSON(nodeHost + "signup/", data, function (data){
    console.log(data);
  });
});
