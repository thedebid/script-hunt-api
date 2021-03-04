const historyModel = require("./history.model");
const categoryModel = require("./../category/category.model");
const levelModel = require("./../level/level.model");

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

async function save(data, user) {
  const categoryId = await categoryModel.find(
    { name: data.category },
    { _id: 1 }
  );
  const levelArr = data.level.split(" ");
  let level = Number(levelArr[1]) + 1;
  level = levelArr[0] + " " + level;

  const levelId = await levelModel.findOne(
    { name: level, category: categoryId },
    { _id: 1 }
  );
  //console.log(levelId);
  const status = await historyModel.levelHistoryModel
    .find({
      uid: data.uid,
      cid: categoryId?.[0]?._id,
      lid: levelId?._id,
    })
    .populate("level");
  if (status.length > 0) {
    return { message: "Already Unlocked" };
  } else {
    user.coins = user.coins + 10;
    const coin = await user.save();

    var newLevelHistory = new historyModel.levelHistoryModel({});
    newLevelHistory.uid = data.uid;
    newLevelHistory.cid = categoryId?.[0]?._id;
    newLevelHistory.lid = levelId?._id;
    newLevelHistory.status = data.status;
    return newLevelHistory.save();
  }
}

module.exports = {
  getLevelHistory,
  save,
};
