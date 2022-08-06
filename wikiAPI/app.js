const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wikiDB').then(() =>{
    console.log("connected to database");
  });
}
/////////////////////////////Request Targetting all article//////////////////////////////
const aritcleSchema = new mongoose.Schema({
    title: String,
    content: String
  });
  
const Article = mongoose.model("Article", aritcleSchema);
  
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.route("/articles")

.get(function (req,res){
    Article.find({}, function(err, foundArticles){
        // console.log(foundArticles);
        if(!err){
            res.send(foundArticles);
        }
        else{
            res.send(err);
        }

    })
})

.post(function(req, res){
    const newArticle = new Article ({
        title: req.body.title,
        content:req.body.content
    })
    // data to be stored in mongoose, how to store data in mongoose? ans above 
    // newArticle.save();   
     newArticle.save(function(err){
        if (!err){
            res.send("Successfully added a new article")

        }else{
            res.send(err);
        }
    })   
})

.delete(function(req, res){
    // delete using mongoose and store data using mongoose
    // Article// is a model
    Article.deleteMany(function(err){
        if(!err){
            res.send("successfully deleted the item");
        }else{
            res.send(err);
        }
    })
});
/////////////////////////////Request Targetting a specific article//////////////////////////////

app.route("/articles/:articleTitle")

.get(function(req, res){
    // read from database and check the title use findone 
    Article.findOne({title: req.params.articleTitle, function(err, foundArticle){
        if(foundArticle){
            res.send(foundArticle);
        }else{
            res.send("no article found matching that title was found")
        }
    }})
})

// .put(function(req,res){
//     // update use from mongoose
//     Article.updateMany{
//         {title: req.params.articleTitle},
//         {title: req.body.title, content: req.body.content},
//         {overwrite: true}
//         if(!err){
//             res.send("Successfully updated article")
//         }
//     }
//})

// .patch(function(req,res){
//     // update and use set flags
//     // {$set: updates}
//     //      : req.body will help us to get the data
// })
.delete(function(req,res){
    Article.deleteOne(
        {title: req.params.articleTitle},
        function(err){
            if(!err){
                res.send("Successfully deleted the item")
            }
            else{
                res.send(err);
            }
        }
    )
})
//TODO

app.listen(3000, function() {
  console.log("Server started on port 3000");
});