module.exports.home=function(req,res){

    // console.log(req.cookies);
    // res.cookie("user_iddd","12344455")
    return  res.render('home',{
        title:"Home_Page"
    });
}
