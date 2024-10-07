const express = require("express");
const router = express.Router();

router.get("/api/survey", (req, res, next) => {
  // get survey from db base on userId
});

router.get("/api/poll", (req, res, next) => {
  // get poll from db base on userId
});

router.post("/api/survey", (req, res, next) => {
  // push a survey to db
});

router.post("/api/poll", (req, res, next) => {
  // push a poll to db
});

router.put("/api/poll", (req, res, next) => {
  // update a poll to db
});

router.put("/api/survey", (req, res, next) => {
  // push a survey to db
});

module.exports = router;
