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
      email: "email1@gmail.com",
      username: "admin",
      password: "12345678",
      profileName: "admin",
    });
    await user1.save();

    const user2 = await User.create({
      email: "email2@gmail.com",
      username: "trananhvu",
      password: "12345678",
      profileName: "sai dep chieu",
    });
    await user2.save();
    console.log("created user: ", user1.username);
    console.log("created user: ", user2.username);
  } catch (error) {
    console.log(error.message);
  }
};

const createDemoSurveys = async () => {
  try {
    const [user1, user2] = await User.find().limit(2);
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
            options: ["yes", "no"],
          },
          {
            questionText: "What do you like about us?",
            questionType: "checkbox",
            options: ["option 1", "option 2", "option 3"],
            requireAnswer: false,
          },
        ],
        createdBy: new mongoose.Types.ObjectId(user1._id.toString()),
        resubmit: false,
      });

      await survey.save();

      console.log("created survey: ", express.json(survey));
    }

    for (let i = 0; i < 4; i++) {
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
            options: ["yes", "no"],
          },
          {
            questionText: "What do you like about us?",
            questionType: "checkbox",
            options: ["option 1", "option 2", "option 3", "option 4"],
            requireAnswer: false,
          },
        ],
        createdBy: new mongoose.Types.ObjectId(user2._id.toString()),
        resubmit: false,
      });

      await survey.save();

      console.log("created survey: ", express.json(survey));
    }
  } catch (e) {
    console.log(e.message);
  }
};

const createDemoData = async () => {
  await createDemoUser();
  await createDemoSurveys();
};

// createDemoData();

app.listen(port, () => {
  console.log("server running on port ", port);
});
