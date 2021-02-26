const levelService = require("./level.service");

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

module.exports = {
  getLevelList,
};
