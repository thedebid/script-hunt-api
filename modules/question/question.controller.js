const questionService = require("./question.service");
const randomQuestionGenerator = require("./../../helpers/generateRandomQuestions");
function getQuestionList(req, res, next) {
  if (req.query.category) {
    questionService
      .findByCategory(req.query.category, req.query.level)
      .then((result) => {
        if (!result.length) {
          return next({
            message:
              "Questions not found with category " + `${req.query.category}`,
            status: "500",
          });
        }
        res.status(200).json(randomQuestionGenerator(result));
      })
      .catch((err) => next(err));
  } else {
    questionService
      .getAll()
      .then((result) => {
        if (!result.length) {
          return next({
            message: "Questions not found",
            status: "500",
          });
        }
        res.status(200).json(result);
      })
      .catch((err) => {
        next(err);
      });
  }
}

function createQuestion(req, res, next) {
  questionService
    .save(req.body)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      next(err);
    });
}

function getQuestionById(req, res, next) {
  questionService
    .findById(req.params.id)
    .then((result) => res.status(200).json(result))
    .catch((err) => next(err));
}

function checkAnswer(req, res, next) {
  const qid = req.params.id;
  const answer = req.query.answer;
  const user = req.user;
  questionService
    .check({ qid, answer, user })
    .then((result) => res.status(200).json(result))
    .catch((err) => next(err));
}
function getAnswer(req, res, next) {
  questionService
    .findById(req.params.id)
    .then((result) => res.status(200).json(result))
    .catch((err) => next(err));
}
module.exports = {
  getQuestionList,
  createQuestion,
  getQuestionById,
  checkAnswer,
  getAnswer,
};
