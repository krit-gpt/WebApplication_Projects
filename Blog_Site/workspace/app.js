var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

app.set("view engine", "ejs");
app.use(express.static("public"));  
//For the CSS FIles -- telling express to automaticlly find in the public directory
app.use(bodyParser.urlencoded({extended: true}));
// Telling app to use body-parser, otherwise, it will no use it!


//CONFIG MONGOOSE and MAKE A MODEL
//mongoose.connect("mongodb://localhost/restful_blog_app");
mongoose.connect("mongodb://localhost/restful_blog_app", {useMongoClient: true});

var blogSchema = new mongoose.Schema({
   title: String,
   image: String,
   body: String,
   created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

Blog.create({
    title: "Test",
    image: "https://unsplash.com/photos/YAK9dlQqA6Y",
    body: "Hello World, this is a blog!"
});

app.get("/", function(req, res){
    res.redirect("/blogs");
    
});

//IN /blogs route, show everything -- INDEX ROUTE, 
//Hence, get everything from the DB, and display it!
app.get("/blogs", function(req, res){
   Blog.find({}, function(err, blogs){
     if(err){
         console.log("ERROR!");
     }else{
         res.render("index.ejs", {blogs: blogs});  
     }
   });
});









app.listen(process.env.PORT, process.env.IP);