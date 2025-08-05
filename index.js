// Requires
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate');
const session = require('express-session');
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const Listing = require("./models/listing.js")

const listings = require("./router/listings.js");
const reviews = require("./router/reviews.js");
const users = require("./router/user.js");
const filters = require("./router/filters.js");

if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
};

//  MONGO Internet link
const dbUrl = process.env.ATLASDB_URL;

async function main(){
    await mongoose.connect(dbUrl);
}

main().then((res) => {
    console.log('mongoose connection successful')
}).catch((err) => {
    console.log('mongoose connection error');    
})

// ==== Express setup
const app = express();
app.use(express.static(path.join(__dirname, '/public')));
app.set('views', path.join(__dirname, 'views'));
const port = 8080;
app.use(express.urlencoded({ extended: true }));  // This is for form submissions
app.use(express.json());
app.use(methodOverride('_method'));


// Session
const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: "mysupersecretcode"
    },
    touchAfter: 24 * 60 * 60, // in seconds // for lazy update;
})
store.on("error", () => {
    console.log("Error in Mongo Store", err);
});

const sessionOptions = {
    store,
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge:  7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
}

app.use(session(sessionOptions));
app.use(flash());


// Passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
//  Serialize And Deserial User
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Flash Middlewares
app.use((req, res, next) => {
    res.locals.success  = req.flash("success");
    res.locals.update   = req.flash("updated");
    res.locals.delete   = req.flash("delete");
    res.locals.error    = req.flash("error");
    res.locals.currUser = req.user;
    next();    
})

//  Ejs Engine
app.set('view engine', 'ejs');
app.engine('ejs', ejsMate);
        
//  Custom error
class ExpressError extends Error{
    constructor(status, message){
        super();
        this.status = status,
        this.message = message;
    }
}

app.get("/", async(req, res) => {
    const allData = await Listing.find({});
    res.render('home.ejs', {allData});
});

// Routers 
app.use("/listing", listings);
app.use("/listing/:id/reviews", reviews);
app.use("/", users);
app.use("/listing/filters", filters);


//  Middleware Error Handler Custom!!

app.all('*', (req, res, next) => {
    next({ status: 404, message: "Page Not Found" });
});

app.use((err, req, res, next)=>{  
    res.render('error.ejs', {err});
    next()
})

// Port Listening
app.listen(port, () => {
    console.log(`app is listening on ${port}`)
})