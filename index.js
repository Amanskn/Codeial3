const express=require('express');
const app=express();
const port=9000;


// requiring the ejs layout
const expressLayouts=require('express-ejs-layouts');

app.use(express.static('./assets'));


// using the expressLayout
app.use(expressLayouts);

// extract styles and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


// use the express router
app.use('/',require('./routes'));


// setting up the view engine
app.set('view engine','ejs');
app.set('views','./views');


app.listen(port,function(err){
    if(err){
        console.log("Error in running the server",err);
        return;
    }
    console.log(`Server is running on port no:${port}`);
})