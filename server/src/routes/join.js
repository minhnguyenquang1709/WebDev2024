const express = require("express");
const authController = require("../controllers/authController")
const joinController = require("../controllers/joinController")

const router = express.Router();

// generate join link when press "Share"
router.get("/share/:surveyId", authController.authJWT, joinController.share);

// handle join by link from users
router.get("/join/:token", authController.authJWT, joinController.join);

module.exports = router;
