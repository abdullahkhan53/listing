const User = require("../models/user.js");

module.exports.signupRender = (req, res) => {
    res.render("User/signup.ejs")
};

module.exports.signupUser =  async(req, res) => {
    try{
        let {username, email, password} = req.body;
    let newUser = new User({username, email});
    let registeredUser = await User.register(newUser, password);
    // console.log(registeredUser);
    req.login(registeredUser, (err) => {
        if(err){
           return next(err);
        }
        req.flash("success", "Welcome to Wanderlust!");
        res.redirect("/listing")
    })  
    } catch(err){
        req.flash("error", err.message);
        res.redirect("/signup")
    }
}

module.exports.loginRender =  (req, res) => {
    res.render("User/login.ejs")
}

module.exports.loginUser =  async(req, res) => {
    req.flash("success", "Welcome back to Wanderlust")
    let redirectUrl = res.locals.redirectUrl || "/listing";
    res.redirect(redirectUrl)
};

module.exports.logoutUser =  (req, res, next) => {
    req.logout((err) => {
        if(err){
            next(err);
            req.flash("error", "some error occured");
        } else{
            req.flash("success", "logged you out!");
            res.redirect("/listing");
        }
    })
};
