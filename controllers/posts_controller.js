const Post=require('../models/post');
const Comment=require('../models/comment');


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


module.exports.destroy=function(req,res){
    Post.findById(req.params.id,function(err,post){

        if(err){
            console.log("Error in finding the post to be deleted in the database",err);
            return;
        }
        // .id meand converting the object id into string
        else if(post){
            if(post.user==req.user.id){
                post.remove();
    
    
                Comment.deleteMany({post:req.params.id},function(err){
    
                    if(err){
                        console.log("Error in deleting the comments associated with the post being deleted",err);
                        return;
                    }
                    return res.redirect('back');
                })
    
    
            }
            else{
                console.log("You are unauthorized to delete this post");
                return res.redirect('back');
            }
        }
        else{
            console.log("The post to be deleted is not found in the database");
            return;
        }
    });
}


