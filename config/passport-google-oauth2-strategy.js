const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');
// const env=require('./environment');

// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
        clientID:"737645565221-3k54ohvq6qedgepnc5j441vd4b39ijqb.apps.googleusercontent.com",
        clientSecret:"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",
        callbackURL:"http://localhost:9000/users/auth/google/callback"
    },
    function(accessToken,refreshToken,profile,done){
        // find a user
        User.findOne({email:profile.emails[0].value}).exec(function(err,user){
            if(err){
                console.log("Error in google-strategy-passport",err);
                return;
            }

            console.log(accessToken,refreshToken,"*****Received Just a check for tokens");
            console.log(profile);
            if(user){
                // if found then set this user as req.user
                return done(null,user);
            }
            else{

                // if not found then create the user and set it as req.user
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex')
                },function(err,user){
                    if(err){
                        console.log("Error in creating user google-strategy-passport",err);
                        return;
                    }
                    return done(null,user);
                });
            }
        });

    }
));


module.exports=passport;