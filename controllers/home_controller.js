const Post=require('../models/post');
const User=require('../models/user');





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
    Post.find({})
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
    .sort({"createdAt":-1})
    // below will also work
    // .sort("-createdAt")
    .exec(function(err,posts){
        if(err){
            console.log("Error in fetching all the posts from the database");
            return;
        }

        User.find({},function(err,users){
            if(err){
                console.log("Error in finding all the users from the database");
                return;
            }
            else{

                return  res.render('home',{
                    title:"Home_Page",
                    posts:posts,
                    all_users:users   
                });
            }
        });


        
        

    });
    
}
