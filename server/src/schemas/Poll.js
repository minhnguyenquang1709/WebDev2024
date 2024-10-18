const mongoose = require("mongoose");

const pollSchema = new mongoose.Schema(
    {
        title: { type: String, required: true }, // The poll's title
        question: { type: String, required: true }, // The main question
        choices: [
            {
                text: { type: String, required: true }, // The choice's text
                votes: { type: Number, default: 0 }, // The number of votes for the choice
            },
        ],
        expiresAt: { type: Date }, // Optional expiration date for the poll
        createdBy: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

const Poll = mongoose.model("Polls", pollSchema);
module.exports = Poll;
