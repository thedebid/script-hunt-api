const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quizHistorySchema = new Schema(
  {
    uid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    qid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "question",
      required: true,
    },
    result: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const quizHistoryModel = mongoose.model("quizhistory", quizHistorySchema);
module.exports = quizHistoryModel;
