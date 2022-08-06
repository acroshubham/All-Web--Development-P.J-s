const express = require("express");
/* constant keyword is used for the variable that will remain constant or cant be used again or constant for the whole code
than we require express, node js framework.

After urlencoding the express in our website. We will declare and app keyword to use express*/
const app = express();

// app is the keyword in which we declare express. It's the basic syntax

const bodyParser = require("body-parser");

// now we require the body parser to our project what it does that it helps to tap onto the values that have been posted to our server.
// it has few modes like text urlencoded helps us to tap into the values of html forms.
// extended: true means that we our nesting the values that are being given to the website. * edit needed

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/bmicalculator", function(req, res) {
  res.sendFile(__dirname + "/bmicalculator.html");
});
// . get function uses route i.e. /bmic that tells that what is the address that is being needed to get the values from and than we use
// res.sendFile this helps us to send a file to given route. __dirname keyword helps us to tap into anywhere the file is placed next to it wehther
// it's placed anywhere in the given location.
app.post("/bmicalculator", function(req, res) {
  var weight = parseFloat(req.body.weight);
  var height = parseFloat(req.body.height);

  var bmi = weight / (height * height);
  res.send("The BMI is " + bmi);
});
// finallly here we are posting the value that we get into our variable and all this is done all at server end that when user goes to the source code only html is shown to him i.e. we
// are successfull to hide the js code i.e. we are doing server side execution. and at xlient or user side nothing is been shown.
// than we make the changes and than we had posted it to the final output by res.send function of the keywork that helps ust ot
// go through it.
app.listen(3000, function() {
  console.log("server has started on port 3000");
});

// it's just done for our sake that when the server is started, it listes to the port 3000 and than we'll console log for hyper that server has been started.
