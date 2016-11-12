// Required Modules
var express    = require("express");
var morgan     = require("morgan");
var app        = express();

var port = process.env.PORT || 3000;

app.use(morgan("dev"));
//app.use(express.static("./app"));

var routes = require('./routes');

app.set('views', __dirname + '/public/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));


app.get("/", function(req, res) {
    //res.sendFile("./app/index.html");
    res.sendFile(__dirname+"/public/views/index.html");
});

app.get("/ejs", function(req, res) {
    //res.sendFile("./app/index.html");
    //res.sendFile(__dirname+"/public/template/index");
    res.render('index', {});
});

// Start Server
app.listen(port, function () {
    console.log( "Express server listening on port " + port);
});