const historyModel = require("./history.model");
const categoryModel = require("./../category/category.model");
async function getLevelHistory(user, category) {
  /// console.log(user, category);
  const categoryId = await categoryModel.find({ name: category }, { _id: 1 });
  return historyModel.levelHistoryModel
    .find({
      uid: user,
      cid: categoryId,
      // lid: level,
    })
    .populate("level");
}

async function save(data) {
  const status = await historyModel.levelHistoryModel
    .find({
      uid: data.uid,
      cid: data.cid,
      lid: data.lid,
    })
    .populate("level");
  if (status.length > 0) {
    return "already unlocked";
  } else {
    var newLevelHistory = new historyModel.levelHistoryModel({});
    newLevelHistory.uid = data.uid;
    newLevelHistory.cid = data.cid;
    newLevelHistory.lid = data.lid;
    newLevelHistory.status = data.status;
    return newLevelHistory.save();
  }
}

module.exports = {
  getLevelHistory,
  save,
};
