const express = require("express");
const router = express.Router({mergeParams: true });
const filtersController = require("../controllers/filter.js")

// ----------- F I L T E R S--------------------------

router.get("/mountains", filtersController.mountains)

router.get("/iconiccity", filtersController.city)

router.get("/amazingpools", filtersController.pools )

router.get("/mountainscity", filtersController.mountainsCity)

router.get("/farms", filtersController.farms)

router.get("/camping", filtersController.camping)

router.get("/castles", filtersController.castles)


// --------------------
module.exports = router;