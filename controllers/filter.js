const Listing = require("../models/listing.js");

module.exports.mountains =  async(req, res) => {
    let allData = await Listing.find({category: "Mountains"})
    // console.log(listing);
     if(allData.length <= 0 ){
        req.flash("error", "There is no Listing you search for");
        res.redirect("/listing");
    }
    res.render("filters/mountains.ejs", {allData})
};

module.exports.city = async(req, res) => {
    let allData = await Listing.find({category: "Iconic City"})
    // console.log(listing);
    if(allData.length <= 0 ){
        req.flash("error", "There is no Listing you search for");
        res.redirect("/listing");
    } else{
        res.render("filters/iconic.ejs", {allData});
    }
};

module.exports.pools = async(req, res) => {
    let allData = await Listing.find({category: "Amazing pools"})
    // console.log(listing);
    if(allData.length <= 0 ){
        req.flash("error", "There is no Listing you search for");
        res.redirect("/listing");
    } else{
    res.render("filters/pools.ejs", {allData});
    }
};

module.exports.mountainsCity =  async(req, res) => {
    let allData = await Listing.find({category: "Mountains City"})
    // console.log(listing);
     if(allData.length <= 0 ){
        req.flash("error", "There is no Listing you search for");
        res.redirect("/listing");
    }
    res.render("filters/mountainscity.ejs", {allData})
};

module.exports.farms = async(req, res) => {
    let allData = await Listing.find({category: "Farms"})
    // console.log(listing);
     if(allData.length <= 0 ){
        req.flash("error", "There is no Listing you search for");
        res.redirect("/listing");
    }
    res.render("filters/farms.ejs", {allData})
};

module.exports.camping = async(req, res) => {
    let allData = await Listing.find({category: "Camping"})
    // console.log(listing);
     if(allData.length <= 0 ){
        req.flash("error", "There is no Listing you search for");
        res.redirect("/listing");
    }
    res.render("filters/camping.ejs", {allData})
};

module.exports.castles = async(req, res) => {
    let allData = await Listing.find({category: "Castles"})
    // console.log(listing);
     if(allData.length <= 0 ){
        req.flash("error", "There is no Listing you search for");
        res.redirect("/listing");
    }
    res.render("filters/castles.ejs", {allData})
};
