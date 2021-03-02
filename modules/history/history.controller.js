const lvlHistoryService = require("./history.service");

function getLevelHistory(req, res, next) {
  lvlHistoryService
    .getLevelHistory(req.query.uid, req.query.cid)
    .then((result) => {
      console.log(result);
      if (!result.length) {
        // res.send(false);
      }
      res.json(result);
    })
    .catch((err) => {
      next(err);
    });
}
function createLevelHistory(req, res, next) {
  lvlHistoryService
    .save(req.body)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      next(err);
    });
}
module.exports = {
  getLevelHistory,
  createLevelHistory,
};
