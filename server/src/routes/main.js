const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const mainController = require("../controllers/mainController");

// get the surveys and polls associated to the user
router.get("/surveys", authController.authJWT, mainController.pullAll);

// get a specific survey/poll to display
router.get("/surveys/:id", authController.authJWT, mainController.pullOne);

// modify a survey/poll
router.put("/surveys/:id", mainController.modify);

// create a new survey/poll and save to database
router.post("/surveys", authController.authJWT, mainController.create);

// get all responses associated to a survey
router.get("/response/:surveyId", mainController.getSurveyResponses);

// submit a response to a survey
router.post("/response", authController.authJWT, mainController.handleResponse);

module.exports = router;
