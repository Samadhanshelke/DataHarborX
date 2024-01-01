const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true,
    },
    Email:{
        type:String,
        required:true,
    },
    Password:{
        type:String,
        required:true,
    },
    Phone:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model("User", UserSchema)

