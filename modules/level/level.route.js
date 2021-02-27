const levelController = require("./level.controller");
const express = require("express");
const router = express.Router();

router
  .route("/")
  .get(levelController.getLevelList)
  .post(levelController.careateLevel);

module.exports = router;
