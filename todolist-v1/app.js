const express = require("express");
const bodyParser = require("body-parser");

const app = express();
var items = [];
// if var item = ""; than only the value will be repeated no values will be added
// new post request whenever made than item is now replaced by the newListITem only one is added and the rest gets overwritten for it use arrays.

var items = ["Buy Food", "Cook Food", "Eat Food"];
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))
app. get("/", function(req, res){
    // var a = 3*5;
    // req.send(a);
    // so this calculation is done at the server side and the results are given to the browser
    var today = new Date();
    var options = {
        weekday: "long",
        day : "numeric",
        month : "long"
    };
    var day = today.toLocaleDateString("en-us", options);






    // var currentDay = today.getDay();
    // var day = "";
    // if (currentDay===1){
    //     // res.send("<h1>Yaee! it's a weekend</h1>")
        
    //     // what we are doing is that we are creating a response by rendring a file called list which have to be contained under the folder view and has an extension of ejs and  than we are passing a single variable and giving it a value which is equal to the value of variable day.
    //     day = "Monday";
    // }else if(currentDay===2){
    //     day = "Tuesday";
    // }else if(currentDay===3){
    //     day = "Wednesday";
    // }else if(currentDay===4){
    //     day = "Thursday";
    // }else if(currentDay===5){
    //     day = "Friday";
    // }else if(currentDay===6){
    //     day = "Saturday";
    // }else{
    //     day = "Sunday";
    // }
    // // switch (currentDay) {
    // //     case 0:
    // //         day = "Sunday"
    // //         break;
    // //     case 1:
    // //         day = "Monday"
    // //     case 2:
    // //         day = "Tuesday"
    // //     case 3:
    // //         day = "Wednesday"
    // //     case 4:
    // //         day = "Thursday"
    // //     case 5:
    // //         day = "Friday"
    // //     case 6:
    // //         day = "Saturday"
    // //         break;
    // //     default:
    // //         console.log("Error! current day is equal to" + currentDay)
    // // } //// ======> HEY JS PLEASE DO THIS FOR ME BUT HOW? G SEARCH JS DATE FORMAT.
    // tolocaldate string
    
    





    res.render("list", {kindOfDay : day, newListItems: items})
    // error is that the items are getting stacked in one list only by difference of , ie banana, beer, cheeze, potato to stop it we will use for loop in list.ejs
})

app.post("/", function(req,res){
    var item = req.body.newItem;
   res.redirect("/");
   items.push(item);
})

app.listen(3000, function(){
    console.log("Server is running on port 3000");
})











// reptition not tolorabale as if one has to send more than one html to server than one has to just keep on writing res.send res.send res.send many many many times.
// But one way is that one can send multiple lines of code by sending the html file. Hence great data can be send with less line of code
// but what when you have to send data for blog website. Will you make post1.html and so on for various other topics. 
// for e.g. here we are creating a TO-DO-LIST. for each time creating a new list i.e. work,home,gorcery, than we have to create a new html page for every single time user creates a new list. Even though the content are the same.
// SO FOR IT WE WILL USE EJS
// Hope you will not 
// So for it we will use templating 
// what are we, we are programmers, what we like to do, what we got, all the codes. so for it we will do templating. So, what we will create templates or EJS templates.
// EJS = EMBEDED JAVASCRIPT TEMPLATING. ==> https://ejs.co/


// in ejs we can also write js as html tag for e.g. for control flow i.e. if else statement one has to 
// write <% %>  one can say js file can be runned in ejs by this symbols
// e.g. 
// <% if (){ %>
//  <%  }else{ %>
//   <% } %> and remember each line of js will consist of that open and closing  things

/* Let's diggin deep so what I have learnt that for listing an item in list in the list.ejs. One can use render 
like : app.post("/", function(req,res){
    res.render("list", newListItem: item);
})
errow arises that newListItem is not defined or we don't have any value in it to be shown as we had in kindOfDay js needs pre values to cope it.
but an error will be thrown as newListItem is not found or it's not mentioned over their
whenever a post method is made at our website the value of newitem will be stored in item and it will redirect to home route and then app. get trigers and than the data will be displayed
res render();

But here also an error arises that the item is out of scope.
so declare it globally 
where were we 
yes at get 
at get when user will tap onto the data. post method will be envoked 
and res.redirect will redirect the user to the list.ejs

271: understanding templates vs layouts

templates are actually simmilar copy of the website but in another website e.g. work notepad
But what if we want to change the layout of the website of we have to keep the header and foother same for every page e.g. about contact me and so on.. 
for it ejs provides layout or partials 
How can we use it.

for implementation 
make new files in views and than 
make header and foother 

now come in to about.html 

use: 

<%- include("header") -%>

!
h and p

<%- include("footer") -%>

bam the page will now get the same look.

for practical knowlege go to 271 no. vedio.




272: understanding node module exports: how to pass functions and data between files 

module.export(get date) in date.js
function getdate(){
    .
    .
    .
    return date;
}

app.js mae

const date = require(__dirname + "/date.js");

console.log(date());
yahn pae ab date run karega as functin kyonki vhan pae function pass kia or yhan pae run kia 

basically kya khna chah rhe ha ky module.export help karta ha ejs ya fir js ko files ek dusre files mae transfer krne mae or data ko transfer krwata ha modules.export namak method

app.get mae 
let day = date();
basically consolelog k jgh use app.get mae run karwa dia 
or isse humne code k bhar nikal dia date code ko


module.export is javascript obj and obj have props and methods associated with it.

if we have more than one funs 
what we will do 

module.export.getDay = getDay;
module.export.getDate = getDate;

end 

console.log("module.export");

change in app.js

let day = date.getDay(); 
or
let day = date.getDate(); 
 change 

 m.e.gD = function(){
    date function
 }
 sves to getDate function decln in js
 this is function expression

 more short 

 m.e 
 only e

 and than delete console log 

 change all const
*/