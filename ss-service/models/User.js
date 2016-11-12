var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var UserSchema   = new Schema({
    email: {
    	type : String,
    	index : true
    },
    username : String,
    password: String,
    token: String, //jwt token
    mobile : Number,
    location : String,
    profession : String,
    skills : [String],
});

module.exports = mongoose.model('User', UserSchema);