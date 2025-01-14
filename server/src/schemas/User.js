const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true, // remove leading and trailing spaces
      minLength: 4,
      maxLength: 20,
      validate: {
        validator: (v) => /^[a-zA-Z0-9_]+$/.test(v), // Allows alphanumeric and underscores
        message: (props) => `${props.value} is invalid`,
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    profileName: {
      type: String,
      required: true,
      unique: true,
      immutable: false,
      minLength: 4,
      maxLength: 20,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);
module.exports = User;
