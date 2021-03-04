const questionModel = require("./question.model");
const helper = require("../../helpers/isValid");
const categoryModel = require("./../category/category.model");
const historyModel = require("./../history/history.model");
const levelModel = require("./../level/level.model");

const quizHistoryModel = historyModel.quizHistoryModel;
function getAll() {
  return questionModel.find({}, { correct_answer: 0 }).populate("category");
}
function save(data) {
  var newQuestion = new questionModel({});
  newQuestion.title = data.title;
  newQuestion.category = data.category;
  newQuestion.level = data.level;
  newQuestion.answers = data.answers.split(",");
  newQuestion.correct_answer_index = data.correct_answer_index;
  return newQuestion.save();
}

async function findById(id) {
  if (!helper.isValidId(id)) throw "Invalid question id:" + ` ${id}`;
  const question = await questionModel.findById(id);
  if (!question) throw "Question with" + ` ${id} ` + "not found";
  return question;
}

async function findByCategory(category, level) {
  const categoryId = await categoryModel.find({ name: category }, { _id: 1 });
  const levelID = await levelModel.find({ name: level }, { _id: 1 });
  if (!categoryId.length) throw "Category with" + ` ${category} ` + "not found";
  const questionList = await questionModel
    .find({ category: categoryId, level: levelID }, { correct_answer: 0 })
    .populate("category");
  return questionList;
}

async function check({ qid, answer, user }) {
  const question = await findById(qid);
  // console.log(typeof answer);
  // console.log(question);
  if (question.correct_answer_index === Number(answer)) {
    //  console.log("correct answer");

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
