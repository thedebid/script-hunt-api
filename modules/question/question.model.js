const mongoose = require("mongoose");
const questionSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    required: true,
  },
  difficultyLevel: { type: String, enum: ["Easy", "Medium", "Hard"] },
  answer: {},
  correct_answer: {
    type: String,
    required: true,
  },
});

const questionModel = mongoose.model("question", questionSchema);
module.exports = questionModel;
