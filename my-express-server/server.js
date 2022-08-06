const express = require("express");

// go to express website go to get started and that you will get  how to do int
// function that represents the express module
const app = express();
app.get("/", function(request, response){
  // console.log(request);
  response.send("Hello");
});
app.listen(3000, function(){
  console.log("server started on port 3000")
});
app.get("/contact", function(req, res){
  console.log("Shubham Sharma");
});
// tells to listen on a specific port for any http request send to the server. Port is basically a channel that we have tuned to.
// in commnand line, its not working that is the command is not running as currently its listening to the port that we have specified

// so to see wether our server is running we will add a callback function


// when we go to server 3000 it says "cannot get/" why because as our browser is making request to our server it can't give anything i.e. request and response
