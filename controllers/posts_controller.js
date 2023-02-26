const Post=require('../models/post');
const Comment=require('../models/comment');


module.exports.create = async function(req,res){
    try{
        let post = await Post.create({
            content:req.body.content,
            user:req.user._id
            // below is also working to set the user id in the database, I don't know why :)
            // user:req.user
        });

        // populating only the name field of user
        await post.populate('user' , 'name');

        if(req.xhr){
            
            return res.status(200).json({
                data:{
                    post:post
                },
                message:"Post published via Ajax!"
            })
        }

    
        req.flash('success','Post published!');
        return res.redirect('back');
    }catch(err){
        req.flash('error',err);
        // console.log("Error",err);
        return res.redirect('back');
    }
}


module.exports.destroy = async function(req,res){
   try{
        let post = await Post.findById(req.params.id);
        if(post){
            if(post.user==req.user.id){
                post.remove();
                await Comment.deleteMany({post:req.params.id});

                req.flash("success",'Post and associated comments deleted!');
                return res.redirect('back');
            }
            else{
                req.flash('error',"You are unauthorized to delete this post");
                console.log("You are unauthorized to delete this post");
                return res.redirect('back');
            }
        }
        else{
            console.log("The post to be deleted is not found in the database");
            return;
        }
   }catch(err){

    req.flash('error',err);
    // console.log("Error",err);
    return res.redirect('back');
   }
}


