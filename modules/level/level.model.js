const mongoose = require("mongoose");
const levelSchema = mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    required: true,
  },
  name: { type: String, required: true },
});

const levelModel = mongoose.model("levelModel", levelSchema);
module.exports = levelModel;
