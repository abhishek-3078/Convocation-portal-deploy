const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email : {
        type : String ,
        required : true ,
        unique : true
    } ,
    password : {
        type : String ,
        required : false
    } ,
        required : true
    },
    profilePhotoName:{
        type:String,
        default:""
    },
    profileUrl:{
        type:String,
        default:null
    }
});


const User = mongoose.model("User" , userSchema);

module.exports = User;