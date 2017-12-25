var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require("method-override");

app.set("view engine", "ejs");
app.use(express.static("public"));  
//For the CSS FIles -- telling express to automaticlly find in the public directory
app.use(bodyParser.urlencoded({extended: true}));
// Telling app to use body-parser, otherwise, it will no use it!

app.use(methodOverride("_method"));
//Using method-override to mimic the PUT request through HTML forms


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

//Blog.create({
//  title: "Test",
   //image: "https://images.unsplash.com/photo-1485466799797-74ecb5ef351b?auto=format&fit=crop&w=750&q=80",
   //body: "Hello World, this is a blog!"
//});

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


//NEW method -- will direct to a form to make new blogs
app.get("/blogs/new", function(req, res){
   res.render("new.ejs"); 
});

//POST request link -- will create a new post and redirect
app.post("/blogs", function(req, res){
    //.create -- make and saves to the Database all at once
   Blog.create(req.body.blog, function(err, newBlog){
      if(err){
          res.render("new.ejs");
      }else{
          res.redirect("/blogs");
      }
   });
});

//SHOW ROUTE -- for an individual blog post -- show more information
app.get("/blogs/:id", function(req, res){
   Blog.findById(req.params.id, function(err, foundBlog){
      if(err){
          console.log(err)
          res.redirect("/blogs");
          
      } else{
          res.render("show.ejs", {blog: foundBlog});
      }
   }); 
});

//EDIT Route
app.get("/blogs/:id/edit", function(req, res){
   Blog.findById(req.params.id, function(err, foundBlog){
      if(err){
         res.redirect("/blogs");
      }else{
         res.render("edit.ejs", {blog: foundBlog});
      }
   });
});

//UPDATE ROUTE -- HTML 5 -- no PUT request in HTML form -- use method-override
app.put("/blogs/:id", function(req, res){
   Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
      if(err){
         res.redirect("/blogs");
      }else{
         res.redirect("/blogs/"+ req.params.id);
      }
   });
});

//DELETE request -- use method-override
app.delete("/blogs/:id", function(req, res){
   Blog.findByIdAndRemove(req.params.id, function(err){
      if(err){
         res.redirect("/blogs");
      }else{
         res.redirect("/blogs");
      }
   });
});

//Start the server
app.listen(process.env.PORT, process.env.IP);