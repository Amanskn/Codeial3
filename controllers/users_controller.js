const User=require('../models/user');


module.exports.profile=function(req,res){
    return res.render('userProfile',{
        title:'User_Profile'
    });
}

// this is the action to render the sign up page
module.exports.signUp=function(req,res){
    return res.render('user_sign_up',{
        title:'Codeial | SignUp'
    });
}


// this is the action to render the sign in page
module.exports.signIn=function(req,res){
    return res.render('user_sign_in',{
        title:'Codeial | SignIn'
    });
}


// getting the sign up data
module.exports.create=function(req,res){
    // if password and confirm password do not match then redirect to the sign up page
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }

    // finding the user in the database
    User.findOne({email:req.body.email},function(err,user){

        // if error in finding the user in the database
        if(err){
            console.log("Error in finding the user during sign up",err);
            return;
        }

        // if user is not found then create a user
        else if(!user){
            User.create(req.body,function(err,user){
                // if error in creating the user
                if(err){
                    console.log("Error in creating a user while signing up",err);
                    return;
                }
                
                // after creation of the user redirect to the sign in page
                return res.redirect('/users/sign-in');
            });
        }

        // if user is found the redirect to the sign up page
        else{
            return res.redirect('back');
        }

    });
    

}


// getting the sign in data and creating a session for the user
module.exports.createSession=function(req,res){
    // TODO later
}




