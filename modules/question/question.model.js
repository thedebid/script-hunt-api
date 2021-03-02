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
  level: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "level",
    required: true,
  },
  answers: {},
  correct_answer_index: {
    type: Number,
    required: true,
  },
});

const questionModel = mongoose.model("question", questionSchema);
module.exports = questionModel;
