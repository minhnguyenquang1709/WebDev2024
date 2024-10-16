const authController = require("./authController");
const mongoose = require("mongoose");
const Survey = require("../schemas/Survey");
const Response = require("../schemas/Response");
const join_key = process.env.JOIN_KEY;

const share = (req, res) => {
  console.log("Begin generating a join link...");
  const surveyId = req.params.surveyId;
  let token = null;
  try {
    token = authController.createJWT({ survey: surveyId }, join_key);
    const link = `http://localhost:3001/form/input/${token}`;
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
  const userId = req.userId.toString();

  try {
    const surveyId = authController.verifyJWT(token, join_key).survey;
    console.log(`surveyId: ${surveyId}`);
    survey = await Survey.findById(surveyId);

    if (!survey) {
      return res.status(404).send("Survey not found");
    }

    // check user participation in the survey
    const isCreator = userId === survey.createdBy.toString();
    const isParticipant = survey.participants.includes(userId);

    if (!isCreator && !isParticipant) {
      // if not the creator nor a participant
      survey.participants.push(new mongoose.Types.ObjectId(userId));
      await survey.save();
      console.log(`Added participant to the survey`);
    }

    const response = await Response.findOne({
      respondent: userId,
      survey: surveyId,
    });
    if (response) {
      // user already responded to the survey
      if (!response.resubmissionAllowed || !survey.resubmit) {
        return res
          .status(403)
          .send(
            "You have already submitted a response, resubmission is not allowed for this survey"
          );
      }

      return res.status(403).send(survey);
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send("Error joining survey");
  }

  return res.status(200).send(survey);
};

module.exports = { join, share };
