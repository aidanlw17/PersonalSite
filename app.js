var express 	= require("express");
	app 		= express();
	request 	= require("request");
	bodyParser 	= require("body-parser");
	mongoose 	= require("mongoose");

mongoose.connect("mongodb://localhost:27017/personal_site", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs")

var blogSchema = new mongoose.Schema({
	title: String,
	image: {type: String, default: "./public/images/question.png"},
	body: String,
	created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema)

Blog.create({
	title: "My first blog",
	image: "/public/images/decawinner.jpg",
	body: "SAYING HELLO FOR THE first time ever on a fun blog fun fun ahhahh"
})

app.get("/", function(req, res){
	res.render("home");
});

app.get("/profile", function(req, res){
	res.render("profile");
});

app.get("/projects", function(req, res){
	res.render("projects");
});

app.get("/ventures", function(req, res){
	res.render("ventures");
});

app.get("/investors", function(req, res){
	res.render("investors");
});

app.get("/blog", function(req, res){
	Blog.find({}, function(err, blogs){
		if(err){
			console.log(err);
		} else {
			res.render("blog", {blogs: blogs});
		}
	});
});

app.get("/blog/new", function(req, res){
	res.render("new");
});

app.post("/blog", function(req, res){
	res.redirect("/blog")
});

app.get("/media", function(req, res){
	res.render("media");
});

app.listen(3000, "localhost", function(){
	console.log("serving local host on port 3000");
});