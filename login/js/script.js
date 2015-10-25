$("#login_submit").click(function (){
  var password = $("#login_pass").val();
  var mail = $("#login_mail").val();
  var data = {};

  data["password"] = password;
  data["mail"] =  mail;
  $.getJSON("http://localhost:3000/talhat/login/index.html", data, function (data) {
    console.log(data);
  });

});
