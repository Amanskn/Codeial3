const Comment=require('../models/comment');
const Post=require('../models/post');

module.exports.create=function(req,res){
    Post.findById(req.body.post,function(err,post){
        if(err){
            console.log("Error in finding the corresponding post in the database",err);
            return;
        }
        else if(post){
            Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            },function(err,comment){
                if(err){
                    console.log("Error in creating comment",err);
                    return;
                }
                post.comments.push(comment);
                post.save();
                res.redirect('/');
            });

        }
        else{
            console.log("So sorry no post is found in the databse");
        }
    });

}

