module.exports.index=function(req,res){
    return res.status(200).json({
        message:"Posts api controller v2",
        posts:[]
    })
}