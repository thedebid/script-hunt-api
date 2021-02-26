const userService = require("./user.service");

function getAllUsers(req, res, next) {
  userService
    .getAll()
    .then((result) => {
      if (!result.length) {
        return next({
          message: "Users not found",
          status: "500",
        });
      }
      res.status(200).json(result);
    })
    .catch((err) => {
      next(err);
    });
}
function getUserById(req, res, next) {
  userService
    .findById(req.params.id)
    .then((result) => res.status(200).json(result))
    .catch((err) => next(err));
}

function getUserByUsername(req, res, next) {
  userService
    .findById(req.params.username)
    .then((result) => res.status(200).json(result))
    .catch((err) => next(err));
}

function userAuthenticate(req, res, next) {
  userService
    .login(req.body)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => next(err));
}

function userRegister(req, res, next) {
  userService
    .register(req.body)
    .then((result) =>
      res.status(200).json({ message: "User registered sucessfully", result })
    )
    .catch((err) => next(err));
}

module.exports = {
  getAllUsers,
  getUserById,
  getUserByUsername,
  userAuthenticate,
  userRegister,
};
