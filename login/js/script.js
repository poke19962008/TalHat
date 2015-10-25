$("#login_submit").click(function (){
  var password = $("#login_pass").val();
  var mail = $("#login_mail").val();
  var data = {};

  data["password"] = password;
  data["mail"] =  mail;
  data['type'] = "login";

  $.getJSON("http://localhost:3000/talhat/login/", data, function (data) {
    console.log(data);
  });

});
