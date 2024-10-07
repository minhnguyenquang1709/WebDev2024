const mongoose = require("mongoose");

const surveySchema = new mongoose.Schema({
  title: { type: String, required: true }, // The survey's title
  description: { type: String, required: false }, // A short description
  questions: [
    {
      questionText: { type: String, required: true }, // The question's text
      questionType: {
        type: String,
        enum: ["select", "multi-select", "text"], // Different types of questions
        required: true,
      },
      choices: [String], // If it's a multiple-choice question
      required: { type: Boolean, default: true }, // Whether the question is required
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  }, // Reference to the survey creator
}, {timestamps: true});

const Survey = mongoose.model("Surveys", surveySchema);
module.exports = Survey;
