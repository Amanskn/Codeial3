const User = require("../models/user");

const fs = require("fs");
const path = require("path");

module.exports.profile = async function (req, res) {
  // return res.render('userProfile',{
  //     title:'User_Profile'
  // });

  // User.findById(req.params.id,function(err,user){
  //     if(err){
  //         console.log("Error in finding the user");
  //         return;
  //     }
  //     return res.render('userProfile',{
  //         title:'User_Profile',
  //         profile_user:user
  //     })
  // })
  try {
    let user = await User.findById(req.params.id).select("name email avatar");

    return res.render("userProfile", {
      title: "Codeial | UserProfile",
      profile_user: user,
    });
  } catch (err) {
    console.log("Error in finding the user");
    return;
  }
};

module.exports.update = async function (req, res) {
  // if(req.user.id == req.params.id){
  //     User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
  //         if(err){
  //             console.log("Error in updating the user",err);
  //             return;
  //         }
  //         else{
  //             req.flash('success',"Profile updated successfully!");
  //             return res.redirect('back');
  //         }
  //     });
  // }
  // else{
  //     return res.status(401).send("Unauthorized");
  // }

  if (req.user.id == req.params.id) {
    try {
      let user = await User.findById(req.params.id);
      User.uploadedAvatar(req, res, function (err) {
        if (err) {
          console.log("******Multer error", err);
        }

        // console.log(req.file);
        user.name = req.body.name;
        user.email = req.body.email;
        if (req.file) {
          if (
            user.avatar &&
            fs.existsSync(path.join(__dirname, "..", user.avatar))
          ) {
            fs.unlinkSync(path.join(__dirname, "..", user.avatar));
          }

          // this is saving the path of the uploaded file into the avatar field in the user
          user.avatar = User.avatarPath + "/" + req.file.filename;
        }
        user.save();
        req.flash("success", "Profile updated successfully!");
        return res.redirect("back");
      });
    } catch (err) {
      req.flash("error", err);
      return res.redirect("back");
    }
  } else {
    req.flash("error", "Unauthorized");
    return res.status(401).send("Unauthorized");
  }
};

// this is the action to render the sign up page
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect(`/users/profile/${req.user._id}`);
  }

  return res.render("user_sign_up", {
    title: "Codeial | SignUp",
  });
};

// this is the action to render the sign in page
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect(`/users/profile/${req.user._id}`);
  }

  return res.render("user_sign_in", {
    title: "Codeial | SignIn",
  });
};

// getting the sign up data
module.exports.create = function (req, res) {
  // if password and confirm password do not match then redirect to the sign up page

  if (req.body.password != req.body.confirm_password) {
    console.log("Password do not match");

    req.flash("success", "Email/password do not match");
    return res.redirect("back");
  }

  // finding the user in the database
  User.findOne({ email: req.body.email }, function (err, user) {
    // if error in finding the user in the database
    if (err) {
      console.log("Error in finding the user during sign up", err);
      return;
    }

    // if user is not found then create a user
    else if (!user) {
      User.create(req.body, function (err, user) {
        // if error in creating the user
        if (err) {
          console.log("Error in creating a user while signing up", err);
          return;
        }

        // after creation of the user redirect to the sign in page
        return res.redirect("/users/sign-in");
      });
    }

    // if user is found the redirect to the sign up page
    else {
      return res.redirect("back");
    }
  });
};

// getting the sign in data and creating a session for the user
module.exports.createSession = function (req, res) {
  req.flash("success", "Logged-in successfully");
  return res.redirect("/");
};

module.exports.destroySession = function (req, res) {
  // This function is given to req by passport.js
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "You have logged-out");
    res.redirect("/");
  });
};
