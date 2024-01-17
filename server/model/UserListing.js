const mongoose = require('mongoose');
const UserListingSchema = new mongoose.Schema({
    UserName:{
        type:String,
        required:true,
    },
    Email:{
        type:String,
        required:true,
    },
    
    Phone:{
        type:String,
        required:true,
    },
    Image:{
        type:String,
        
    }
    
},{timestamps:true})

module.exports = mongoose.model("UserListing", UserListingSchema)