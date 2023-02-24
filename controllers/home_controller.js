const Post=require('../models/post');





module.exports.home=function(req,res){

    // console.log(req.cookies);
    // res.cookie("user_iddd","12344455")

    // Post.find({},function(err,posts){
    //     if(err){
    //         console.log("Error in fetching all the posts from the database");
    //         return;
    //     }
    //     return  res.render('home',{
    //         title:"Home_Page",
    //         posts:posts
    //     });
    // })


    // populating the user of each post excluding the password field
    // and also sorting in reverse chronological order
    Post.find({}).populate('user',"-password")
    .sort({"createdAt":-1})
    // below will also work
    // .sort("-createdAt")
    .exec(function(err,posts){
        if(err){
            console.log("Error in fetching all the posts from the database");
            return;
        }
        return  res.render('home',{
            title:"Home_Page",
            posts:posts   
        });
        

    });
    
}
