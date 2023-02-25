const Post=require('../models/post');
const Comment=require('../models/comment');


module.exports.create = async function(req,res){
    try{
        await Post.create({
            content:req.body.content,
            user:req.user._id
            // below is also working to set the user id in the database, I don't know why :)
            // user:req.user
        });
    
        return res.redirect('back');
    }catch(err){
        console.log("Error",err);
        return;
    }
}


module.exports.destroy = async function(req,res){
   try{
        let post = await Post.findById(req.params.id);
        if(post){
            if(post.user==req.user.id){
                post.remove();
                await Comment.deleteMany({post:req.params.id});
                return res.redirect('back');
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
   }catch(err){
    console.log("Error",err);
    return;
   }
}


