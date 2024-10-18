const express = require("express");
const cors = require("cors");

const configServerApp = (app) => {
  app.use(express.json());
  app.use(
    cors({
      origin: (origin, callback) => {
        callback(null, origin); // reflect the origin sent by the client
      },
      credentials: true,
    })
  );

  const mainRouter = require("../routes/main");
  const auth = require("../routes/auth");
  const allowAccessRouter = require("../routes/join");
  app.use("/api", mainRouter);
  app.use("/auth", auth.router);
  app.use("/joinlink", allowAccessRouter);
};

module.exports = configServerApp;
