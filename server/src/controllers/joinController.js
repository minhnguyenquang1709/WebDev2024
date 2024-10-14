const authController = require("./authController");
const mongoose = require("mongoose");
const Survey = require("../schemas/Survey");
const join_key = process.env.JOIN_KEY;

const share = (req, res) => {
  console.log("Begin generating a join link...");
  const surveyId = req.params.surveyId;
  let token = null;
  try {
    token = authController.createJWT({ survey: surveyId }, join_key);
    const link = `http://localhost:3000/joinlink/join/${token}`;
    res.send(link);
  } catch (e) {
    console.log(e);
    return res.status(500).send("Error generating link");
  }
};

const join = async (req, res) => {
  console.log("Begin joining a survey...");
  const token = req.params.token;
  let survey = null;

  try {
    const surveyId = authController.verifyJWT(token, join_key).survey;
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
};

module.exports = { join, share };
