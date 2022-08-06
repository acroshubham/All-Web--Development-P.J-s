const express = require("express");

const app = express() ;

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.get("/", function(req, res){
  // res.sendFile("index.html"); when we don't know the path for example our code resides on cloud than
  res.sendFile(__dirname + "/index.html");
});
app.post("/", function(req, res){


  var num1 = Number(req.body.num1);
  var num2 = Number(req.body.num2);
  // body has everything that have been parsed than we have parsed onto num1. for the value of it. vedio number 235. is super super important for it's information.
  var result = num1+num2;
  res.send("The result of calculation is "+ result);
  // so here we got 4+5 45 why as we are getting the parsed value as 45 so one has to do explicit-type conversion
});
// it allows me to go in any routes of the body and tap into req.body i.e the past version of http requests

app.listen(3000, function(){
  console.log("Server has started on port 3000.");
});


// now if we hit enter and see the source code at user side we only see the htnl code and js is hidden as its all done in our server side this is because we have all in backend.
// now we have a web application.
