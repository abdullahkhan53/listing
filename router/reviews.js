const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require('../Utility/wrapAsync.js');
const {isLoggedin, isAuthor} = require("../middlewares.js");
const reviewController = require("../controllers/review.js");


//  Custom error
class ExpressError extends Error{
    constructor(status, message){
        super();
        this.status = status;
        this.message = message;
    }
}

// Review POST rqst
router.post('/',
    isLoggedin,
    wrapAsync(reviewController.createReview))

// Review Delete Route
router.delete('/:reviewId',
    isLoggedin,
    isAuthor,
    wrapAsync(reviewController.destroyReview))

module.exports = router;