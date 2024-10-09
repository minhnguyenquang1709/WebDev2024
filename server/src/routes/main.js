const express = require("express");

const router = express.Router();

const mongoose = require("mongoose");
const Survey = require("../schemas/Survey");
const User = require("../schemas/User");

const auth = require("./auth");
const jwt = require("jsonwebtoken");

router.get("/surveys", auth.authJWT, async (req, res) => {
  try {
    console.log("Getting surveys...");
    // console.log(req.userId);

    const surveys = await Survey.find().byParticipation(req.userId);
    // console.log("surveys: ", surveys);
    // const polls = await Poll.find();
    res.json(surveys);
    // console.log("done getting surveys");
  } catch (e) {
    console.log("error getting data: ", e.message);
  }
});

router.get("/surveys/:id", auth.authJWT, async (req, res) => {
  console.log(`Getting survey ${req.params.id}`);
  const survey = await Survey.findOne({ _id: req.params.id });
  // console.log(`returned survey: ${survey}`)
  res.send(survey);
});

router.put("/surveys/:id", async (req, res) => {
  console.log(`Enter put survey ${req.params.id}`);

  // handle updating a survey
  try {
    const survey = await Survey.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (survey) {
      // console.log("Got the survey: ", survey);
      // console.log("the data to update: ", req.body);
    }
  } catch (e) {
    console.log(e.message);
  }
});

router.post("/surveys", auth.authJWT, async (req, res) => {
  console.log(`Enter creating a new survey in server...`);
  // console.log(`Data from client: ${req.body}`);
  const { title, description, questions } = req.body;

  try {
    const newSurvey = Survey.create({
      title: title,
      description: description,
      questions: questions,
      createdBy: req.userId,
    });
    console.log(`Created newSurvey: ${newSurvey}`);

    const savedSurvey = await newSurvey.save();
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
