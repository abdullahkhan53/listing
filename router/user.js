const express = require("express");
const router = express.Router();
const wrapAsync = require('../Utility/wrapAsync.js');
const passport = require("passport");
const {saveRedirectUrl} = require("../middlewares.js");

const userController = require("../controllers/user.js")

// Signup User
router.get("/signup",userController.signupRender);

router.post("/signup", wrapAsync(userController.signupUser));

// Login User
router.get("/login", userController.loginRender);

router.post("/login",
 saveRedirectUrl,
 passport.authenticate("local", {failureRedirect: "/login", failureFlash: true}),
 userController.loginUser
)

// Logout User
router.get("/logout", userController.logoutUser)

module.exports = router;