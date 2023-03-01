const nodeMailer=require('../config/nodemailer');



// this is another way of exporting a method
exports.newComment=(comment)=>{
    // console.log("Inside newComment mailer");

    let htmlString=nodeMailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');

    nodeMailer.transporter.sendMail({
        from:'amandev1938@gmail.com',
        to:comment.user.email,
        subject:'New Comment Published!!',
        // html:'<h1>Yes, your comment is now published!!!</h1>'
        html:htmlString
    },(err,info)=>{
        if(err){
            console.log('Error in sending mail',err);
            return;
        }
        // console.log("Message sent ",info);
        return;
    });
}