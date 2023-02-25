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



module.exports.destroy=function(req,res){
    Comment.findById(req.params.id,function(err,comment){
        if(err){
            console.log("Error in fetching the comment to be deleted from the database",err);
            return;
        }
        else if(comment){

            if(comment.user==req.user.id){

                let postId=comment.post;
                comment.remove();

                Post.findByIdAndUpdate(postId,{ $pull : {comments:req.params.id}},function(err,post){
                    if(err){
                        console.log("Error in updating the post while deleting a comment",err);
                        return;
                    }
                    return res.redirect('back');

                });



            }
            else{
                console.log("You are unauthorized to delete this comment");
                return res.redirect('back');
            }
        }
        else{
            console.log("The comment to be deleted is not found in the databse");
            return;
        }
    })
}

