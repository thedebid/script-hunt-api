const levelModel = require("./level.model");
const categoryModel = require("./../category/category.model");
function getAll() {
  return levelModel.find();
}

function save(data) {
  var newLevel = new levelModel({});
  newLevel.category = data.category;
  newLevel.name = data.name;
  return newLevel.save();
}
async function findByCategory(data) {
  const categoryId = await categoryModel.find({ name: data }, { _id: 1 });
  if (!categoryId.length) throw "Invalid category";
  const levelList = await levelModel
    .find({ category: categoryId })
    .populate("category")
    .lean();


    
  return levelList;
}
module.exports = {
  getAll,
  save,
  findByCategory,
};
