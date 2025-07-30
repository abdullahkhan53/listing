const Listing = require('../models/listing.js');
const Review = require('../models/review.js');
const {reviewSchema} = require('../joi.js');

module.exports.createReview = async(req, res) => {
    let result = reviewSchema.validate(req.body);
    
    if(result.error){
        throw new ExpressError(400, result.error)
    };

    let {id} = req.params;
    let updListing = await Listing.findById(id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    // console.log(newReview)

    updListing.reviews.push(newReview);

    await newReview.save();
    await updListing.save();

    // console.log(updListing)
    res.redirect(`/listing/${id}`)

};

module.exports.destroyReview = async(req, res) => {
    let {id, reviewId} = req.params;
    await Review.findByIdAndDelete(reviewId);
    await Listing.findByIdAndUpdate(id, {$pull:{reviews: reviewId}});
    res.redirect(`/listing/${id}`);
}