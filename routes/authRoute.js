const express = require("express");
const router = express.Router();
const authController = require("../controller/authController.js");
const {isAuth} = require("../middleware/auth.js");
const passport = require("passport");


router.post("/register" , authController.register);
router.post("/login"  , authController.login);
router.get("/get-session" , isAuth , authController.checkSession);
router.get("/google" , passport.authenticate("google" , {scope : ["email" , "profile"]}));
router.get("/google/callback" , passport.authenticate("google") , authController.loginWithGoogle);
router.get("/secret" , authController.secret);


module.exports = router;