const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
  respondent: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  survey: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  responses: [
    {
      questionId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
      },
      answer: {
        type: mongoose.Schema.Types.Mixed,
        default: null, // for questions that does not require an answer
      },
    },
  ],
  submittedAt: {
    type: Date,
    default: () => Date.now(),
  },
});

module.exports = mongoose.model("responses", responseSchema);
