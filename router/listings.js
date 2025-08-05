const express = require("express");
const router = express.Router({mergeParams: true });
const wrapAsync = require('../Utility/wrapAsync.js');
const {isLoggedin, isOwner, isSized} = require("../middlewares.js");
const listingController = require("../controllers/listing.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js")
const upload = multer({ storage });
const Listing = require("../models/listing.js");


// index && create route of listings!!
router.route("/")
.get( listingController.index )
.post(
    isLoggedin,
    upload.single('Listing[image]'),
    isSized,
    wrapAsync(listingController.createListing)
 )
// -----------------------------------

// New Route
router.get('/new', isLoggedin,  listingController.newListing)

router.get("/search", async(req, res) => {
    let searchCountry = req.query.country;
    if(!searchCountry || searchCountry.length < 4 ){
        req.flash("error", "There is no listing you search for");
        res.redirect("/listing")
    }
    let listing = await Listing.find({country: searchCountry});
    if(listing.length <= 0){
        req.flash("error", "There is no listing you search for");
        res.redirect("/listing")
    }
    res.render("search.ejs", {listing});
})


// update && delete && show routes of listings!!
router.route("/:id")
.put(
    isLoggedin,
    isOwner,
    upload.single('Listing[image]'),
    listingController.updateListing
)
.delete(isLoggedin, isOwner, listingController.destroyListing)
.get(listingController.showListinng);




// Edit route
router.get('/:id/edit', isLoggedin, isOwner, listingController.editListing)



// -----------------------------------
module.exports = router;