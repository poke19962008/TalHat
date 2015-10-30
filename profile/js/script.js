var nodeHost = "http://localhost:3001/"

$(document).ready(function (){

  $.getJSON(nodeHost + "getPassionsforProfile/","", function (data){
    for (var i = 0; i < data.length; i++) {
      var li = "<li style=\"padding-top: 10px; padding-right: 15px; padding-bottom: 10px; padding-left: 15px;\"><a href=\"../index.html\">#"+ data[i].passion +"  <span class=\"badge\">" + data[i].count +"</span></a></li>";
      $("#passions-list").append(li);
    }
  });
});

$("#passion-keyword").on("click keyup", function (){
  var keyword = $("#passion-keyword").val();
  $.getJSON(nodeHost + "getPassionsWithKeywords/", keyword, function(data){
    // $("#passions")
  });
});
