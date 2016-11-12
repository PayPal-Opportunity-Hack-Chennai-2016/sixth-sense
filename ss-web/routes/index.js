module.exports = function(app) {
	app.get("/", function(req, res) {
	    //res.sendFile("./app/index.html");
	    res.sendFile(__dirname+"/public/template/index.html");
	});

	app.get("/ejs", function(req, res) {
	    //res.sendFile("./app/index.html");
	    //res.sendFile(__dirname+"/public/template/index");
	    res.render('index', {});
	});

}