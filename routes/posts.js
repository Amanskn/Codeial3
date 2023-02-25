const express=require('express');
const passport = require('passport');

const router=express.Router();


const postsController=require('../controllers/posts_controller');


// Now here we use the middleware to restrict someone from being able to make a post
// via creating a form using developer tools without establishing his/her identity. 
// So now he/she would not be able to make a post
// on our website even if he/she will create a form in developer tools and try to fiddle with our website, Got it:)

// CONCLUSION : we are putting a check at the url's action level, i.e. we are not letting the user to
// penetrate into my action without passing the check of authentication. So if the user is not signed in 
//  he/she will not be able to reach the action of creating a post. So an identity will always be established before making a post. 

router.post( '/create' , passport.checkAuthentication , postsController.create );
router.get( '/destroy/:id' , passport.checkAuthentication , postsController.destroy );

module.exports=router;