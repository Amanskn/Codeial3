const Post=require('../models/post');


module.exports.create=function(req,res){
    Post.create({
        content:req.body.content,
        user:req.user._id
        // below is also working to set the user id in the database, I don't know why :)
        // user:req.user
    },function(err,post){
        if(err){
            console.log("Error in creating a post",err);
            return;
        }
        return res.redirect('back');
    });
}
