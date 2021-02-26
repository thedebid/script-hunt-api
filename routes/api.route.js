const router = require("express").Router();
const authorize = require("../middlewares/authorize");
const categoryRoute = require("../modules/category/category.route");
const userRoute = require("../modules/user/user.route");
const questionRoute = require("../modules/question/question.route");

router.use("/category", authorize, categoryRoute);
router.use("/user", userRoute);
router.use("/question", authorize, questionRoute);

module.exports = router;
