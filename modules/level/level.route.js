const levelController = require("./level.controller");
const historyController = require("./../history/history.controller");
const express = require("express");
const router = express.Router();

router
  .route("/")
  .get(levelController.getLevelList)
  .post(levelController.careateLevel);

router
  .route("/history")
  .get(historyController.getLevelHistory)
  .post(historyController.createLevelHistory);

module.exports = router;
