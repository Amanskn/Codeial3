const Comment=require('../models/comment');
const Post=require('../models/post');
const commentsMailer=require('../mailers/comments_mailer');


module.exports.create = async function(req,res){

    console.log("Inside async");
    try{
        console.log("Inside try");
        let post = await Post.findById(req.body.post);
        if(post){
            console.log("Post found");
            let comment = await Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            });
            console.log("Comment created");
            post.comments.push(comment);
            post.save();
            await comment.populate('user','name email');

            console.log("Before xhr");
            commentsMailer.newComment(comment);
            if(req.xhr){
                console.log("Inside xhr");
                
                return res.status(200).json({
                    data:{
                        comment:comment
                    },
                    message : "Comment created via Ajax!"
                });
              
            }
            console.log("Not xhr");
            req.flash('success',"Comment created!")
            return res.redirect('back');
        }
        else{
            req.flash('error',"So sorry no post is found in the database!")
            // console.log("So sorry no post is found in the database");
            return;
        }

    }catch(err){

        console.log("Inside catch");
        req.flash('error',err);
        // console.log("Error",err);
        return res.redirect("back");

    }
}



module.exports.destroy = async function(req,res){
    
    try{
        let comment = await Comment.findById(req.params.id);
        if(comment){
            if(comment.user==req.user.id){

                let postId=comment.post;
                comment.remove();
                await Post.findByIdAndUpdate(postId,{ $pull : {comments:req.params.id}});



                if(req.xhr){
            
                    return res.status(200).json({
                        data:{
                            // both will work
                            // post_id:post._id
                            comment_id:req.params.id
                        },
                        message:"Comments deleted via Ajax!"
                    });
                }

                req.flash("success","Comment deleted!");
                return res.redirect('back');
            }
            else{

                req.flash("error","You are unauthorized to delete this comment!");
                // console.log("You are unauthorized to delete this comment");
                return res.redirect('back');
            }
        }
        else{
            console.log("The comment to be deleted is not found in the databse");
            return;
        }
    }catch(err){
        req.flash('error',err);
        // console.log("Error",err);
        return res.redirect('back');
    }

}

