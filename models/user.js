const mongoose=require('mongoose');
const multer=require('multer');

const path=require('path');

// this is the path where the all the avatars' paths will be stored   
const AVATAR_PATH = path.join('/uploads/users/avatars');
// console.log("Hey this is the vatar path",AVATAR_PATH);
// console.log("this is the dirname",__dirname);


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
    },
    avatar:{
        type:String
    }
},{
    timestamps:true
});



let storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'..',AVATAR_PATH));

    },
    filename:function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now());
    }
});


console.log("This is the actual path using the path join functionality",path.join(__dirname,'..',AVATAR_PATH));

// static functions/methods
userSchema.statics.uploadedAvatar=multer({storage:storage}).single('avatar');
userSchema.statics.avatarPath=AVATAR_PATH;

const User=mongoose.model('User',userSchema);
module.exports=User;