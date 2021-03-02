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

const levelHistorySchema = new Schema(
  {
    uid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    cid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    lid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "level",
      required: true,
    },
    status: {
      type: String,
      enum: ["Locked", "Unlocked"],
      default: "Locked",
    },
  },
  {
    timestamps: true,
  }
);

const quizHistoryModel = mongoose.model("quizhistory", quizHistorySchema);
const levelHistoryModel = mongoose.model("levelHistory", levelHistorySchema);

module.exports = { quizHistoryModel, levelHistoryModel };
