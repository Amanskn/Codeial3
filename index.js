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

// uses for session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');

const MongoStore=require('connect-mongo');

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





// setting up the view engine
app.set('view engine','ejs');
app.set('views','./views');



// mongo store is used to store the session cookie in the db

app.use(session({
    name:'codeial',
    // TODO change the secret before deployment in production mode
    secret:"blahsomething",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: MongoStore.create({
      
        mongoUrl : "mongodb://0.0.0.0:27017/social_media_3",
         autoremove : "disabled",
     },function(err){
         console.log("error at mongo store",err || "connection established to store cookie");
     })
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);


// use the express router
app.use('/',require('./routes'));


// The server starts here
app.listen(port,function(err){
    if(err){
        console.log("Error in running the server",err);
        return;
    }
    console.log(`Server is running on port no:${port}`);
});