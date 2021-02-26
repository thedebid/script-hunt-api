const levelModel = require("./level.model");

function getAll() {
  return levelModel.find();
}

module.exports = {
  getAll,
};
