const userModel = require("../user/user.model");
const helper = require("../../helpers/isValid");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const config = require("./../../configs/config");

function getAll() {
  return userModel.find();
}

async function findById(id) {
  if (!helper.isValidId(id)) throw "Invalid user id";
  const user = await userModel.findById(id);
  if (!user) throw "User with" + ` ${id} ` + "not found";
  return user;
}

async function findByUsername(username) {
  const user = await userModel.findOne({ username: username });
  return user;
}

async function login(data) {
  const { username, password } = data;
  const user = await findByUsername(username);
  if (!user) throw "User with" + ` ${username} ` + "not found";
  const isMatched = bcrypt.compareSync(password, user.password);
  if (isMatched) {
    var token = generateJwtToken(user);
    return { user, token };
  } else throw "Invalid password";
}

async function register(data) {
  const { username, password, email, name } = data;
  const user = await findByUsername(username);
  if (!user) {
    const newUser = new userModel({});
    newUser.name = name;
    newUser.username = username;
    newUser.email = email;
    console.log(password);
    //Generating hash
    const hash = bcrypt.hashSync(password, saltRounds);
    newUser.password = hash;
    return newUser.save();
  } else throw "Username already exist";
}

function generateJwtToken(user) {
  // create a jwt token containing the user id
  return jwt.sign({ id: user._id }, config.jwtSecret);
}

module.exports = {
  getAll,
  findById,
  findByUsername,
  login,
  register,
};
