const Comment=require('../models/comment');
const Post=require('../models/post');

module.exports.create = async function(req,res){

    try{
        let post = await Post.findById(req.body.post);
        if(post){
            let comment = await Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            });
            post.comments.push(comment);
            post.save();
            res.redirect('/');
        }
        else{
            console.log("So sorry no post is found in the database");
            return;
        }

    }catch(err){
        console.log("Error",err);
        return;

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
                return res.redirect('back');
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
    }catch(err){
        console.log("Error",err);
        return;
    }

}

