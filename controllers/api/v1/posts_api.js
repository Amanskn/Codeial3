const Post=require('../../../models/post');
const Comment=require('../../../models/comment');


module.exports.index = async function(req,res){
    

    let posts = await Post.find({})
        .populate('user',"-password")
        .populate({
            path:'comments',
            populate:{
                path:'user',
                // to hide as many fields as I want from being populated
                // select:'-name -password -email',
                // to only populate the name field of the user
                select:'name',
            },
            options: {
                sort: { createdAt: -1 } // sort by createdAt field in descending order
            }
        })
        // below will also work
        // .sort("-createdAt")
        .sort({"createdAt":-1});


    return res.status(200).json({
        message:"List of posts",
        posts:posts
        // posts:[]
    });
}




module.exports.destroy = async function(req,res){
    try{
        let post = await Post.findById(req.params.id);
        if(post){
            //  if(post.user==req.user.id){
                post.remove();
                await Comment.deleteMany({post:req.params.id});
 
 
                // if(req.xhr){
                //      return res.status(200).json({
                //         data:{
                //              // both will work
                //              // post_id:post._id
                //              post_id:req.params.id
                //         },
                //         message:"Post and associated comments deleted via Ajax!"
                //     });
                // }
                //  req.flash("success",'Post and associated comments deleted!');
                //  return res.redirect('back');
                return res.status(200).json({
                    message:'Post and associated comments deleted! via Api'
                });
            //  }
            //  else{
            //      req.flash('error',"You are unauthorized to delete this post");
            //      // console.log("You are unauthorized to delete this post");
            //      return res.redirect('back');
            //  }
        }
        else{
            //  console.log("The post to be deleted is not found in the database");
            //  return;
            return res.status(200).json({
                message:'The post to be deleted is not found in the database'
            });
        }
    }catch(err){
 
    //  req.flash('error',err);
    //  // console.log("Error",err);
    //  return res.redirect('back');

        return res.status(500).json({
            message:"Internal server error"
        })
    }
}
 
 
 