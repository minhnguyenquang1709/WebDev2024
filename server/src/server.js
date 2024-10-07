const express = require("express");
const mongoose = require("mongoose");
const User = require("./schemas/User");

// server
const app = express();

const authRouter = require("./routes/main");
const generatorRouter = require("./routes/generator");
app.use("/auth", authRouter);
app.use("/new", generatorRouter);

// ------------------------------------------------------------------------------
// database
const dbName = "appdb";

const connectToDb = async () => {
  await mongoose.connect(`mongodb://localhost/${dbName}`);
  console.log(`connected to ${dbName}`);
};

connectToDb();

const createUser = async () => {
  try {
    const user = await User.create({
      username: "trungnh",
      password: "12345678",
      profileName: "Soi co doc",
    });
    await user.save();
    console.log("created user: ", user.username);
  } catch (error) {
    console.log(error.message);
  }
};

createUser();
