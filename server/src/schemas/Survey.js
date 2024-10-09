const mongoose = require("mongoose");

const surveySchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // The survey's title
    description: { type: String, required: false }, // A short description
    questions: [
      {
        questionText: { type: String, required: true }, // The question's text
        questionType: {
          type: String,
          enum: ["radio", "checkbox", "text"], // Different types of questions
          required: true,
        },
        options: [String], // If it's a multiple-choice question
        requireAnswer: {
          type: Boolean,
          default: true,
        },
      },
    ],
    createdBy: {
      // Reference to the survey creator
      type: mongoose.SchemaTypes.ObjectId,
      // ref: "users",
      required: true,
    },
    participants: {
      type: [mongoose.SchemaTypes.ObjectId],
      default: [],
    },
  },
  {
    timestamps: true,
    validate: {
      validator: () => {
        return this.questions.length > 0;
      },
      message: "A survey must have at least one question!",
    },
  }
);

surveySchema.query.byParticipation = function (userId) {
  return this.where({
    $or: [
      { createdBy: userId.toString() },
      { participants: userId.toString() },
    ],
  });
};

const Survey = mongoose.model("surveys", surveySchema);
module.exports = Survey;
