const Listing = require('../models/listing.js');
const {listingSchema} = require('../joi.js');

if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
};

// MAPBOX GEOCODING
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });


//  Custom error
class ExpressError extends Error{
    constructor(status, message){
        super();
        this.status = status
        this.message = message;
    }
}


module.exports.index = async (req, res) => {
    const allData = await Listing.find({});
    res.render('home.ejs', {allData});
    // console.log(allData)
}

module.exports.newListing = (req, res) => {
    res.render('new.ejs')
}

module.exports.createListing =  async(req, res) => {
    
  let response = await geocodingClient
  .forwardGeocode({
  query: req.body.Listing.location,
  limit: 1,
  })    
  .send();
   
    let url = req.file.path;
    let filename = req.file.filename;
    console.log(req.body)
    let result = listingSchema.validate(req.body);

    if(result.error){
        console.log(result.error)
        throw new ExpressError(400, result.error)  
    }

    try{
    const newListing = new Listing(req.body.Listing);
    newListing.image = {url, filename}
    newListing.owner = req.user._id;
    newListing.geometry = response.body.features[0].geometry;
    
    let newwListing = await newListing.save()
    console.log(newwListing)
    req.flash("success", "New Listing Added!");
    res.redirect('/listing')
    } catch(err){
        console.log("ERRORR!!", err)
    }
    
};

module.exports.editListing = async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    let originalUrl = listing.image.url;
    let originalImageUrl = originalUrl.replace("/upload", "/upload/h_200,w_200");
    if(!listing){
        req.flash("error", "listing does not exist!");
        res.redirect("/listing")
    } else{
        res.render('edit.ejs', {listing, originalImageUrl})
    }
}

module.exports.updateListing = async (req, res) => {
    let {id} = req.params;
    let updateListing = await Listing.findByIdAndUpdate(id, {...req.body.Listing}, {runValidators: true});
    
    if(typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    updateListing.image = {url, filename};
    await updateListing.save();
    };

    req.flash("updated", "Listing Updated");
    res.redirect(`/listing/${id}`)
    
}

module.exports.destroyListing = async (req, res) => {
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("delete", "Listing has been deleted!");
    res.redirect('/listing')
}

module.exports.showListinng = async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id)
    .populate({path: "reviews", populate:{path: "author"}})
    .populate("owner");
    if(!listing){
        req.flash("error", "Listing does not exist!");
        res.redirect("/listing")
    } else{
        // console.log(listing)
        res.render('details.ejs', {listing});
    }
}
