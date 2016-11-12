// Required Modules
var express    = require("express");
var morgan     = require("morgan");
var bodyParser = require("body-parser");
var jwt        = require("jsonwebtoken");
var mongoose   = require("mongoose");
var app        = express();

var port = process.env.PORT || 3001;
var User = require('./models/User');
var Post = require('./models/posts');

// Connect to DB
var mongoURL = (process.env.MONGO_URL) ? process.env.MONGO_URL : "mongodb://localhost:27107/ohack";
mongoose.connect(process.env.MONGO_URL);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));


app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

// mount the api routing 
var router = require('./routes/routes');
app.use('/api',router);


process.on('uncaughtException', function(err) {
    console.log(err);
});

// Start Server
app.listen(port, function () {
    console.log( "Express server listening on port " + port);
});
