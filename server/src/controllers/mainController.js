const Survey = require("../schemas/Survey");
const Response = require("../schemas/Response");
const jwt = require("jsonwebtoken");
const { verifyJWT } = require("./authController");

const key = process.env.JOIN_KEY;

// get all surveys/polls to display on main page
const pullAll = async (req, res) => {
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
};

// get a survey to view/edit
const pullOne = async (req, res) => {
  console.log(`Getting survey ${req.params.id}`);
  const survey = await Survey.findOne({ _id: req.params.id });
  // console.log(`returned survey: ${survey}`)
  res.send(survey);
};

// modify a survey/poll
const modify = async (req, res) => {
  console.log(`Enter updating a survey/poll ${req.params.id}`);

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
};

// create a new survey/poll
const create = async (req, res) => {
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

    await newSurvey.save();
  } catch (e) {
    console.log(e);
  }
};

// delete a survey/poll

// get survey responses to display stats
const getSurveyResponses = async (req, res) => {
  try {
    const surveyId = req.params.surveyId;
    const responses = await Response.find({ survey: surveyId });

    console.log(`responses: ${responses}, length = ${responses.length}`);

    if (!responses || responses.length === 0) {
      return res.status(404).send("No responses found for this survey.");
    }

    return res.status(200).send(responses);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error fetching responses.");
  }
};

const handleResponse = async (req, res) => {
  console.log("Begin responding...");
  try {
    const userId = req.userId;
    let { respondent, formToken, responses, submittedAt } = req.body;
    let surveyId = verifyJWT(formToken, key).survey;
    respondent = userId;
    console.log(
      `respondent: ${respondent}\nsurveyId: ${surveyId}\nresponses: ${responses}\nsubmittedAt: ${submittedAt}`
    );

    // check if the survey/poll allows resubmission
    const survey = await Survey.findOne({ _id: surveyId.toString() });
    // if (survey) {
    //   console.log(
    //     `surveyId: ${surveyId.toString()}\nsurvey._id: ${survey._id.toString()}`
    //   );
    // }

    const submissionData = {
      respondent: userId,
      survey: surveyId,
      responses: responses,
      submittedAt: submittedAt,
      resubmissionAllowed: survey.resubmit,
    };

    const newResponse = await Response.create(submissionData);
    return res.status(200).send("Response submitted!");
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  pullAll,
  pullOne,
  modify,
  create,
  getSurveyResponses,
  handleResponse,
};
