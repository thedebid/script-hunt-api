const mongoose = require("mongoose");
const levelSchema = mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    required: true,
  },
  difficultyLevel: { type: String, enum: ["Easy", "Medium", "Hard"] },
  status: { type: String, enum: ["Locked", "Unlocked"] },
  passed: {
    type: Boolean,
    required: true,
  },
});

const levelModel = mongoose.model("levelModel", levelSchema);
module.exports = levelModel;
