// Required Modules
var express    = require("express");
var morgan     = require("morgan");
var app        = express();

var port = process.env.PORT || 3000;

app.use(morgan("dev"));

app.set('views', __dirname + '/public/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));


app.get("/", function(req, res) {
    //res.sendFile("./app/index.html");
    res.sendFile(__dirname+"/public/views/index.html");
});

app.get("/login", function(req, res) {
    //res.sendFile("./app/index.html");
    //res.sendFile(__dirname+"/public/template/index");
    res.render('login', {});
});

app.get("/register", function(req, res) {
    //res.sendFile("./app/index.html");
    //res.sendFile(__dirname+"/public/template/index");
    res.render('register', {});
});
app.get("/profile", function(req, res) {
    //res.sendFile("./app/index.html");
    //res.sendFile(__dirname+"/public/template/index");
    res.render('profile', {});
});

app.get("/home", function(req, res) {
    //res.sendFile("./app/index.html");
    //res.sendFile(__dirname+"/public/template/index");
    res.render('home', {});
});
app.get("/blank", function(req, res) {
    //res.sendFile("./app/index.html");
    //res.sendFile(__dirname+"/public/template/index");
    res.render('blank', {});
});

// Start Server
app.listen(port, function () {
    console.log( "Express server listening on port " + port);
});