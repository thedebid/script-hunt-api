import levelController from "./level.controller";
const express = require("express");
const router = express.Router();

router.route("/").get(levelController.getLevelList);

module.exports = router;
