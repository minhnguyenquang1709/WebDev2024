const express = require("express");
const jwt = require("jsonwebtoken");
const Survey = require("../schemas/Survey");
const { authJWT, createJWT, verifyJWT } = require("./auth");
const mongoose = require("mongoose");

const join_key = "jOiN";

const router = express.Router();

// generate join link when press "Share"
router.get("/share/:surveyId", authJWT, (req, res) => {
  console.log("Begin generating a join link...");
  const surveyId = req.params.surveyId;
  let token = null;
  try {
    token = createJWT({ survey: surveyId }, join_key);
    const link = `http://localhost:3000/joinlink/join/${token}`;
    res.send(link);
  } catch (e) {
    console.log(e);
    return res.status(500).send("Error generating link");
  }
});

// handle join by link from users
router.get("/join/:token", authJWT, async (req, res) => {
  console.log("Begin joining a survey...");
  const token = req.params.token;
  let survey = null;

  try {
    const surveyId = verifyJWT(token, join_key).survey;
    console.log(`surveyId: ${surveyId}`);
    survey = await Survey.findById(surveyId);

    if (!survey) {
      return res.status(404).send("Survey not found");
    }

    // add user to "participants" if not creator
    const userId = req.userId.toString();
    if (
      userId !== survey.createdBy.toString() &&
      !survey.participants.includes(userId)
    ) {
      survey.participants.push(new mongoose.Types.ObjectId(userId));
      console.log(`Added a participant`);
      await survey.save();
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send("Error joining survey");
  }

  return survey;
});

module.exports = router;
