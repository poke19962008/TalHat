var nodeHost = "http://localhost:3001/"

$(document).ready(function (){

  $.getJSON(nodeHost + "getPassionsforProfile/","", function (data){
    for (var i = 0; i < data.length; i++) {
      var li = "<li><a href=\"../index.html\">#"+ data[i].passion +"  <span class=\"badge\">" + data[i].count +"</span></a></li>";

      $("#side-menu").append(li);
    }
  });
});
