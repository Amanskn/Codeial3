// Change by AmanCSE
require("dotenv").config();

// requiring the express module
const express = require("express");

const env = require("./config/environment");

// requiring the cookie parser module to parse the cookie
const cookieParser = require("cookie-parser");

const app = express();

// The port on which our server will run
// const port=env.port;
const port = env.port;

// requiring the ejs layout
const expressLayouts = require("express-ejs-layouts");

// requiring the database
const db = require("./config/mongoose");

// uses for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");

const passportJWT = require("./config/passport-jwt-strategy");
const passportGoogle = require("./config/passport-google-oauth2-strategy");

const MongoStore = require("connect-mongo");

const sassMiddleware = require("node-sass-middleware");

const flash = require("connect-flash");
const customMware = require("./config/middleware");

const path = require("path");

// app.use(
//   sassMiddleware({
//     src: path.join(__dirname, env.asset_path, "scss"),
//     dest: path.join(__dirname, env.asset_path, "css"),
//     debug: true,
//     outputStyle: "extended",
//     prefix: "/css",
//   })
// );

// express.urlencoded() is a built-in middleware in Express.js.
//  The main objective of this method is to parse the incoming
// request with urlencoded payloads and is based upon the body-parser.
// This method returns the middleware that parses all the urlencoded bodies.
app.use(express.urlencoded({ extended: true }));

// calling the cookie-parser middleware
app.use(cookieParser());

// middleware to access static files inside assets folder
app.use(express.static(env.asset_path));

// make the upload path available to the browser
app.use("/uploads", express.static(__dirname + "/uploads"));

// why not this ???
// app.use(express.static('./uploads'));

// using the expressLayout
app.use(expressLayouts);

// extract styles and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// setting up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// mongo store is used to store the session cookie in the db
app.use((req, res, next) => {
  console.log("@@@@@@@@@@@@@@@express.session() middleware is being invoked.");
  next();
});
app.use(
  session({
    name: "bob",
    // TODO change the secret before deployment in production mode
    secret: env.session_cookie_key,

    saveUninitialized: false,
    resave: false,
    cookie: {
      name: "builder",
      maxAge: 1000 * 60 * 100,
      // maxAge:(1000*5)
    },
    store: MongoStore.create(
      {
        mongoUrl: "mongodb://0.0.0.0:27017/social_media_3",
        autoremove: "disabled",
      },
      function (err) {
        console.log(
          "error at mongo store",
          err || "connection established to store cookie"
        );
      }
    ),
  })
);

app.use(passport.initialize());
app.use((req, res, next) => {
  console.log("passport.session() middleware is being invoked.");
  next();
});

// This middleware is responsible for serializing and deserializing user
// sessions for authentication purposes. It enables Passport to store user
//  information in a session, so that the user doesn't need to re-authenticate
// on each request.
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

// use the express router
app.use("/", require("./routes"));

// The server starts here
app.listen(port, function (err) {
  if (err) {
    console.log("Error in running the server", err);
    return;
  }
  console.log(`Server is running on port no:${port}`);
  // console.log(process.env.CODEIAL3_ASSET_PATH);
  // console.log(process.env.CODEIAL3_GMAIL_USERNAME);
  // console.log("this is the env name: ",env.name);
  // console.log(NODE_ENV);
});
