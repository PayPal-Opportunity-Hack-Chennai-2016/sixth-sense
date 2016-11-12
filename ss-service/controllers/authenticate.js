var User     = require('../models/User');
var jwt        = require("jsonwebtoken");
module.exports = {
   signUp  : signUp,
   signIn  : signIn,
   getUser : getUser,
   updateProfile : updateProfile
}

/*
  Creating new user
  @param email
  @param password
*/
function signUp(req,res,next){
   if(! req.body.email || !req.body.password){
     return res.status(404).json({
     	error : "Email/password missing"
     });
   }
   var email = req.body.email; 
   var password = req.body.password;
   User.findOne({email : 'email'},function(err,user){
   		if (err) {
   		   console.log(err);
           return res.status(404).json({
                error : "SignUp operation failed.",
            });
        }

        if(user){
        	return res.status(404).json({
        		error : "User "+  email + "already exists"
        	});
        }

        var userModel = new User();
        userModel.email = req.body.email;
        userModel.password = req.body.password;
        userModel.save(function(err, user) {
	        user.token = jwt.sign(user, "Sixth_Sense_Secret_Code"); //secret code
	        user.save(function(err, user1) {
	        	    console.log(user1.token);
	                return res.json({
	                       data: user1,
	                       token: user1.token
	                });
	            });
        });


   });
	
}

function updateProfile(req,res,next) {
   if(! req.body.email || !req.body.location){
        return res.status(400).json({
          error : "Email/location missing"
      });
   }

   User.findOne({email: req.body.email}, function(err, user) {
        if(err) {
           console.log(err);
           return  res.status(500).json({
                error : "Error while searching user"
           });
        }

        if(user === null) {
           return  res.status(404).json({
                error : "No user exists"
           });  
        }

        user.mobile = req.body.mobile;
        user.location = req.body.location;
        user.profession = req.body.profession;
        user.skills = req.body.skills;
        user.save(function(err, user) {
            if(err) {
                console.log(err);
                return res.status(500).json({
                  error : "Error occured while update profile"
                });
            }

            if (user) {
               console.log("User updated.");
               return res.json({
                         data: user,
                         type: true
                });
            }
        });  
   });   
}

/*
  Login operation
  @param email
  @param password
*/
 function signIn(req,res,next){
	if(! req.body.email || !req.body.password){
	     return res.status(404).json({
	     	error : "Email/password missing"
	     });
   }	
   User.findOne({email: req.body.email, password: req.body.password}, function(err, user) {
        if(err) {
           console.log(err);
           return  res.json({
                error : "SignIn operation failed."
            });
        } 

        if(user) {
           return res.json({
                data: user,
                token: user.token
            }); 
         } 
        return res.json({
            type: false,
            data: "Incorrect email/password"
        });    
            
        
    });


}

function getUser(req,res,next){
	User.findOne({token: req.token}, function(err, user) {
        console.log("===============================" + err);
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            res.json({
                type: true,
                data: user
            });
        }
    });

}