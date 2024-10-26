const express = require("express");
const dotenv = require("dotenv");
const main = require("./config.js");
const cors = require("cors");
const passport = require("passport");
const googleStrategy = require("passport-google-oauth20");
const session = require("express-session");
const store = require("connect-mongo");
const authRoute = require("./routes/authRoute.js");
dotenv.config();
const app = express();


app.use(cors({
    origin : "http://localhost:5173" ,
    credentials : true
}));

app.use(session({
    secret : process.env.secret ,
    resave : false ,
    saveUninitialized : false ,
    cookie : {
        secure : false , 
        maxAge : 600000
    } ,
    store : store.create({
        mongoUrl : process.env.url
    })
}));

app.use(passport.initialize()); // used to initialise passport
app.use(passport.session()); // used to persist session


// strategy
passport.use(new googleStrategy({
    clientID : process.env.GOOGLE_CLIENT_ID ,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET ,
    callbackURL : 'http://localhost:8080/api/v1/auth/google/callback'
} , 
(accessToken , refreshToken , profile , done)=> {
    done(null , profile); // passes the profile data to serializeUser
}));

// Used to stuff a piece of information into a cookie
passport.serializeUser((user , done)=> {
    done(null , user);
});

// used to decode the received cookie and persist session
passport.deserializeUser((user , done)=> {
    done(null , user);
});


app.use(express.json());

main();


app.use("/api/v1/auth" , authRoute);


app.listen(process.env.PORT , ()=> {
    console.log("app is listening...");
});