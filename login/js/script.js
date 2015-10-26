/*
  Wrong Password -> "checkPassword": false
  Success ->"status": "success"
  User exists -> "userExists":  false
  Server fault -> "status" : "serverFault"
*/

var nodeHost = "http://localhost:3000/"; // TODO: wrap with closure

function setModal(title, message){
  $("#modal_error").modal('show');
  $("#modal_title").html(title);
  $("#modal_message").html(message);
}

$("#login_submit").click(function (){
  var password = $("#login_pass").val();
  var mail = $("#login_mail").val();
  var data = {};

  data["password"] = password;
  data["mail"] =  mail;
  data['type'] = "login";

  $.getJSON(nodeHost + "login/", data, function (data) {
    console.log(data);
    // Customize modal_error with the response
    if(!data['userExist'])
      setModal("404 Not Found", "Enter correct mail ID and password.");

    if(data.status == "success")
      setModal("sucess", "true");

    // Redirect to profile page
    // set seassion
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

    // Customize modal_error with the response
    if(data.status == "serverFault")
      setModal("Something went wrong!!", "Come back later.");

    if(data.userExist)
      setModal("Taken", "Mail ID is already taken.");


  });
});
