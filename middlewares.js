const Listing = require("./models/listing");
const Review = require("./models/review");

module.exports.isLoggedin = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You have must be logged in");
        res.redirect("/login");
    } else{
        next();
    }
}

module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl =  req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner =   async(req, res, next) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);

    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error", "Your'nt the owner of this Listing");
        return  res.redirect(`/listing/${id}`)
    }
    next();
}

module.exports.isAuthor = async(req, res, next) => {
    let {id, reviewId} = req.params;
    let review = await Review.findById(reviewId);
    
    if(!res.locals.currUser._id.equals(review.author._id)){
        req.flash("error", "Your'nt the owner of this Review");
        return  res.redirect(`/listing/${id}`);
    }
    next();
    
}

module.exports.isSized = (req, res, next) => {
    let size = req.file.size / (1024 * 1024) 
    if(size >= 0.5){
        req.flash("error", "Your image size is too large try another image!");
        return res.redirect(`/listing/new`);
    } else {
    next();
    }
}