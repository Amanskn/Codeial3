const mongoose=require('mongoose');
const multer=require('multer');

const path=require('path');

// this is the path where the all the avatars' paths will be stored   
const AVATAR_PATH = path.join('/uploads/users/avatars');


const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    }
},{
    timestamps:true
});


const User=mongoose.model('User',userSchema);
module.exports=User;