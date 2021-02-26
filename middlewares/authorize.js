const jwt = require("jsonwebtoken");
const config = require("./../configs/config");
const userModel = require("./../modules/user/user.model");

module.exports = function (req, res, next) {
  var token;
  if (req.headers["authorization"]) token = req.headers["authorization"];
  if (req.headers["x-access-token"]) token = req.headers["x-access-token"];
  if (req.headers["token"]) token = req.headers["token"];
  if (req.query.token) token = req.query.token;

  if (token) {
    jwt.verify(token, config.jwtSecret, function (err, decoded) {
      if (err) {
        return next(err);
      }
      // console.log("decoded value is >", decoded);
      userModel.findById({ _id: decoded.id }).then(function (user) {
        if (user) {
          // database current record is attached in every req
          req.user = user;
          next();
        } else {
          next({
            msg: "User not found in system",
          });
        }
      });
    });
  } else {
    next({
      msg: "Token not provided",
      status: 400,
    });
  }
};
