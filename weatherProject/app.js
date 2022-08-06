// Creating a new node app for that we need to require express module and that we have to initialize it by creating an app.

const express = require("express");

const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
const  https = require("https");
// not install using node as we already have it bunddled within the node pj
// ***
// what should happen when the user goes on to our home page the root route.
// Google: Make get request to external server with node.
// we'll use native https node module
// and search for get request
app.get("/", function(req, res){

  res.sendFile(__dirname + "/index.html");

  // res.send("Server is up and running");
});

app.post("/", function(req,res){
  // console.log("post request recieved");
  const query = req.body.cityName;
  const appKey = "09ddaaa1f25b12ddbcf8247cff2c107f";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&APPID="+appKey;
  https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
      // console.log(data);
      const weatherData = JSON.parse(data);
      console.log(weatherData);
      // how about change the data into strings, here it is:
      const object ={
        name: "shubham",
        favoriteCar: "Lamborghini"
      }
      console.log(JSON.stringify(object));

      const icon =weatherData.weather[0].icon
      const imageURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png"
      const wD = weatherData.weather[0].description
      // it'll come from weatherData json object
      console.log(wD);
      const temp = weatherData.main.temp
      console.log(temp);
      res.write("<h1> The weather is currently "+ wD+ "</h1>");
      res.write("<h1>The temprature in "+query+" is "+ temp + " degree kelvin </h1>");
      res.write("<img src ="+imageURL +" >");
      // self closing tags
      res.send();
    });
  });
})





/*
244: How to parser JSON.
statusCode is the https codes that have their specific meaning 200 is ok and 404 is some typo is done
http status dogs
we can tap into the response that we get back
on method and search to the data
data that we get back is hexadecimal code.
hexadecimal converter website helps us to convert it. to convert it we will use
JSON.parse that will convert it to whole text

e.g. wardrobe taken out from code and than coverted to hexadecimal and than
 JSON.parse(data) again helps to convert that into the JS or JSON format.
stringify is like taking that wordrobe again and packing it into small fragments.

Now that we got the data. How can we tap into that data
so one has to look onto the main key and the temp key.

To tap onto the values or data from the js file i.e. main.temp.
One can directly choose the api we are using go onto google tap on it open the json pro and just tap onto the piece
of informnation that we're interested.

245: using express to render a website with live api data.
*/










//*** At the very end we are going to listen on port 3000. and we gonna console log that are server is running or port 3000.
app.listen(3000, function(){
  console.log("Server is running on port 3000.")
});
