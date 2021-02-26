const questionModel = require("./question.model");
const helper = require("../../helpers/isValid");
const categoryModel = require("./../category/category.model");
const quizHistoryModel = require("./../history/history.model");

function getAll() {
  return questionModel.find({}, { correct_answer: 0 }).populate("category");
}
function save(data) {
  var newQuestion = new questionModel({});
  newQuestion.title = data.title;
  newQuestion.category = data.category;
  newQuestion.difficultyLevel = data.difficultyLevel;
  newQuestion.answer = data.answer.split(",");
  newQuestion.correct_answer = data.correct_answer;
  return newQuestion.save();
}

async function findById(id) {
  if (!helper.isValidId(id)) throw "Invalid question id:" + ` ${id}`;
  const question = await questionModel.findById(id);
  if (!question) throw "Question with" + ` ${id} ` + "not found";
  return question;
}

async function findByCategory(data) {
  const categoryId = await categoryModel.find({ name: data }, { _id: 1 });
  if (!categoryId.length) throw "Category with" + ` ${data} ` + "not found";
  const questionList = await questionModel
    .find({ category: categoryId })
    .populate("category");
  return questionList;
}

async function check({ qid, answer, user }) {
  const question = await findById(qid);
  if (question.correct_answer === answer) {
    console.log("correct answer");
    user.coins = user.coins + 5;
    const coin = await user.save();
    var newQuizHistory = new quizHistoryModel({});
    newQuizHistory.uid = user._id;
    newQuizHistory.qid = qid;
    newQuizHistory.result = true;
    await newQuizHistory.save();
    return {
      message: "Correct Answer",
    };
  } else {
    return {
      message: "Wrong Answer",
    };
  }
}

module.exports = {
  getAll,
  save,
  findById,
  findByCategory,
  check,
};
