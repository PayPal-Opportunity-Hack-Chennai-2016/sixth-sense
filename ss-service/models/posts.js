var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var PostSchema   = new Schema({
    title: String,
    description: String,
    post_owner: {
    	type :String,
    	index : true
    },
    post_type : {
    	type : String,
    	enum : ['REQUESTING','OFFERING']// R- Request, 
    },
    beneficiary : [{
    	type : String,
    	index : true
    }],
    location : String,
    created_at : Date,
    last_modified : Date,
    status : {
    	type :String,
    	enum : ['OPEN','ASSIGNED','CLOSED']
    },
    tags : []
    
});

module.exports = mongoose.model('Post', UserSchema);