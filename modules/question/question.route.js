const questionController = require("./question.controller");
const express = require("express");
const router = express.Router();

router
  .route("/")
  .get(questionController.getQuestionList)
  .post(questionController.createQuestion);

router.route("/checkAnswer/:id/").get(questionController.checkAnswer);

router.route("/:id").get(questionController.getQuestionById);
//   .delete(categoryController.deleteCategory)
//   .put(categoryController.updateCategory);

module.exports = router;
