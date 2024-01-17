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
    Gender:{
        type:String,
        required:true
    },
    City:{
        type:String,
        required:true
    },
    State:{
        type:String,
        required:true
    },
    hearAbout: {
        type: [String],
        enum: ['Friends', 'LinkedIn','Job Portal','Other'],
        required: true,
      },

    isAdmin:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model("User", UserSchema)

