const questionController = require("./question.controller");
const express = require("express");
const router = express.Router();

router
  .route("/")
  .get(questionController.getQuestionList)
  .post(questionController.createQuestion);
router.route("/getAnswer/:id/").get(questionController.getAnswer);

router.route("/checkAnswer/:id/").get(questionController.checkAnswer);

router.route("/:id").get(questionController.getQuestionById);

module.exports = router;
