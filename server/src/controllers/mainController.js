const Survey = require("../schemas/Survey");

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

const pullOne = async (req, res) => {
  console.log(`Getting survey ${req.params.id}`);
  const survey = await Survey.findOne({ _id: req.params.id });
  // console.log(`returned survey: ${survey}`)
  res.send(survey);
};

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

module.exports = { pullAll, pullOne, modify, create };
