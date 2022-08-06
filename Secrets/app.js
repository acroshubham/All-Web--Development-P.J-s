require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session")
const passport = require("passport");
const passportLocalMongoose = require ("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// pkg for googleauth20
const findOrCreate = require("mongoose-findorcreate");
//pkg created by the users who created passport doc that helps to find a user if not that create that user 
// const encrypt = require("mongoose-encryption");
// const md5 = require('md5');
// const bcrypt = require("bcrypt");



const app = express();


main().catch(err => console.log(err));

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.use(session({
    secret:"Our little secret.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());

app.use(passport.session());

// read through passport docs


async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/usersdb').then(() =>{    
      console.log("connected to database");
    });
  }
// Before encrypt change 

// const userSchema = {
//     email: String,
//     password: String
// }

// After encrypt change

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    googleId: String,
    secret: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

// mongoose.Schema is a javascript object so, enclosed in paranthesis

// userSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ["password"] });
// it'll encrypt my entire database. so only password so change the option.
  
const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy()); 

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, {
        id: user.id,
        username: user.username,
        picture: user.picture
      });
    });
  });
  
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });   

// google auth 20 codes starts here
// order is imp. we cant put our code above the session as if no
//  user session is recorded that how will the code work.
// it's really imp to place the code below the session of code creation that is the seralize and deserealize user

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    // passReqToCallback: true
},
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

app.get("/", function(req, res){
    res.render("home");
});
app.get("/auth/google", 
    passport.authenticate('google', { successRedirect: '/secrets',scope:
        [ 'email', 'profile' ]
    }));

app.get('/auth/google/secrets', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/secrets');
});

app.get("/login", function(req, res){
    res.render("login");
});

app.get("/secrets", function(req, res){
    // if (req.isAuthenticated()){
    //     res.render("secrets");
    // } else {
    //     res.render("/login");
    // } // mongo db field not null
    User.find({"secret": {$ne: null}}, function(err, foundUsers){
        if(err){
            console.log(err);
        }else {
            if(foundUsers){
                res.render("secrets", {userwithSecrets: foundUsers})
            }
        }
    })
});

app.get("/register", function(req, res){
    res.render("register");
});

app.get("/logout", function(req, res){
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

app.get("/submit", function(req,res){
    if (req.isAuthenticated()){
        res.render("submit");
    } else {
        res.render("/login");
    }
});

app.post("/submit", function(req, res){
    const submittedSecret = req.body.secret;

    const userFound = req.user.id;
    
    User.findById(userFound, function(err, foundUser){
        if(err){
            console.log(err);
        } else {
            if(foundUser) {
                foundUser.secret = submittedSecret;
                foundUser.save(function(){
                    res.redirect("/secrets");
                })
            }
        }
      })
})

app.post("/register", function(req, res){

    // bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    //     // Store hash in your password DB.
    //     const newUser = new User ({
    //         email: req.body.username,
    //         password: hash
    //         // password: req.body.password => without md5 or hashing concept
    //         // password: md5(req.body.password)
    //     });
    
    //     newUser.save(function(err){
    //         if(err){
    //             console.log(err);
    //         } else {
    //             res.render("secrets");
    //         }
    //     });
    // });   
    
    


    User.register({username: req.body.username}, req.body.password, function(err, user){
        if (err){
            console.log(err);
            res.redirect("/register");
        }else{
            // type of authentication is don is loal
            passport.authenticate("local")(req,res, function(){
                res.redirect("/secrets");
            })
        }
    })

});


app.post("/login", function(req, res){

//    const username = req.body.username;
// // const password = md5(req.body.password);
//    const password = req.body.password;

//    User.findOne({email: username}, function(err, foundUser){
//     if (err){
//         console.log(err);
//     }else {
//         if(foundUser){
//             bcrypt.compare(password, foundUser.password, function(err, result) {
//                  //result == true
//                  if (result == true){
//                     res.render("secrets");
//                  }
//             });                
//             }
//         }
//     });




    const user = new User ({
        username: req.body.username,
        password: req.body.password
    })
    req.login(user, function(err){
        if(err){
            console.log(err);
        }else {
            passport.authenticate("local")(req,res, function(){
                res.redirect("/secrets");
            })
        }
    })
});


 
app.listen(3000, function(){
    console.log("Server started on port 3000");
});