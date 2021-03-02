const levelService = require("./level.service");
const histoyLevelService = require("./../history/history.service");

function getLevelList(req, res, next) {
  if (req.query.category) {
    levelService
      .findByCategory(req.query.category)
      .then((result) => {
        if (!result.length) {
          return next({
            message: "Level not found with category " + `${req.query.category}`,
            status: "500",
          });
        }
        let levelStatus = {};
        result.forEach((item, i) => {
          histoyLevelService
            .getLevelHistory(req.user._id, item.category.name, item._id)
            .then((r) => {
              levelStatus = {
                ...levelStatus,
                r,
              };
            });
        });
        console.log(result);
        res.status(200).json(result);
      })
      .catch((err) => next(err));
  } else {
    levelService
      .getAll()
      .then((result) => {
        if (!result.length) {
          return next({
            message: "Level not found",
            status: "500",
          });
        }
        res.status(200).json(result);
      })
      .catch((err) => {
        next(err);
      });
  }
}

function careateLevel(req, res, next) {
  levelService
    .save(req.body)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = {
  getLevelList,
  careateLevel,
};
