// requiring the express module
const express=require('express');

// requiring the cookie parser module
const cookieParser=require('cookie-parser');

const app=express();

// The port on which our server will run
const port=9000;


// requiring the ejs layout
const expressLayouts=require('express-ejs-layouts');

// requiring the database
const db=require('./config/mongoose');


// express.urlencoded() is a built-in middleware in Express.js.
//  The main objective of this method is to parse the incoming 
// request with urlencoded payloads and is based upon the body-parser.
// This method returns the middleware that parses all the urlencoded bodies.
app.use(express.urlencoded({extended: true}));

// calling the cookie-parser middleware
app.use(cookieParser());

// middleware to access static files inside assets folder
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


// The server starts here
app.listen(port,function(err){
    if(err){
        console.log("Error in running the server",err);
        return;
    }
    console.log(`Server is running on port no:${port}`);
});