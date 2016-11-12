var express    = require('express');

var authController = require('../controllers/authenticate');

var router = express.Router();

router.get('/', function(req, res) {
	res.json({ message: 'welcome to our sixth sense api!' });	
});

router.post('/signup',authController.signUp);
router.post('/authenticate',authController.signIn);
router.get('/me',ensureAuthorized,authController.getUser);


router.get('/profile',ensureAuthorized,authController.getUser);
router.post('/profile', function updateProfile(){
    res.json({});
})

// router.put('/country/:country_id',controller.updateCountry);
// router.delete('/country/:country_id',controller.deleteCountry);


function ensureAuthorized(req, res, next) {
    console.log("ensureAuthorized===============================");
    var bearerToken;
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.send(403);
    }
}
	
module.exports = router;