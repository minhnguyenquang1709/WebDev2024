const express = require("express");
const cookieParser = require("cookie-parser");
const User = require("../schemas/User");

const authController = require("../controllers/authController")

const router = express.Router();

router.use(express.json());
router.use(cookieParser());



// login route
router.post("/login", authController.login);

// logout route
router.post("/logout", authController.logout);

// register route
router.post("/register", authController.checkAccInfo, authController.register);

module.exports = { router };
