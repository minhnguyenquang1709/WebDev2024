const configServerApp = require("./configs/configServerApp");
const express = require("express");
const mongoose = require("mongoose");
const User = require("./schemas/User");
const Survey = require("./schemas/Survey");
require("dotenv").config();
const port = process.env.PORT;

// initialize and config server
const app = express();
configServerApp(app);

// ------------------------------------------------------------------------------
// database
const dbName = "appdb";

const connectToDb = async () => {
  await mongoose.connect(`mongodb://localhost/${dbName}`);
  console.log(`connected to ${dbName}`);
};

connectToDb();

const createDemoUser = async () => {
  try {
    const user1 = await User.create({
      username: "admin",
      password: "12345678",
      profileName: "admin",
    });
    await user1.save();

    const user2 = await User.create({
      username: "trananhvu",
      password: "12345678",
      profileName: "sai dep chieu",
    });
    await user2.save();
    // console.log("created user: ", user1.username);
  } catch (error) {
    console.log(error.message);
  }
};

// createDemoUser();

const createDemoSurveys = async () => {
  try {
    for (let i = 0; i < 10; i++) {
      const survey = await Survey.create({
        title: `demo survey ${i}`,
        description: "this is a demo survey number " + i,
        questions: [
          {
            questionText: "What is your name?",
            questionType: "text",
          },
          {
            questionText: "Do you want to take a survey?",
            questionType: "radio",
            choices: ["yes", "no"],
          },
          {
            questionText: "What do you like about us?",
            questionType: "checkbox",
            choices: ["option 1", "option 2", "option 3"],
            requireAnswer: false,
          },
        ],
        createdBy: new mongoose.Types.ObjectId("67068815857a646ce957b0f1"),
      });

      await survey.save();

      console.log("created survey: ", express.json(survey));
    }
  } catch (e) {
    console.log(e.message);
  }
};

// createDemoSurveys();

app.listen(port, () => {
  console.log("server running on port ", port);
});
