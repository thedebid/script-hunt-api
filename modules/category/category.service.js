const categoryModel = require("./category.model");
const helper = require("../../helpers/isValid");

function getAll() {
  return categoryModel.find();
}
function save(data) {
  var newCategory = new categoryModel({});
  newCategory.name = data.name;
  newCategory.icon = data.icon;
  return newCategory.save();
}

async function findById(id) {
  if (!helper.isValidId(id)) throw "Invalid category id:" + ` ${id}`;
  const category = await categoryModel.findById(id);
  if (!category) throw "Category with" + ` ${id} ` + "not found";
  return category;
}

async function remove(id) {
  const category = await findById(id);
  await category.remove(id);
}

async function update(id, data) {
  const category = await findById(id);

  // copy params to category and save
  Object.assign(category, data);
  await category.save();

  return category;
}

module.exports = {
  getAll,
  save,
  findById,
  remove,
  update,
};
