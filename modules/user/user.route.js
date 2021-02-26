const userController = require("./user.controller");
const express = require("express");
const router = express.Router();

router.route("/").get(userController.getAllUsers);
// .post(categoryController.createCategory);

router.route("/register").post(userController.userRegister);

router.route("/login").post(userController.userAuthenticate);

router.route("/:id").get(userController.getUserById);

module.exports = router;
