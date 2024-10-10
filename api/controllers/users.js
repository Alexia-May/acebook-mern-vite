const User = require("../models/user");
const { generateToken } = require("../lib/token");
const { tokenChecker } = require('../middleware/tokenChecker');

function create(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const gender = req.body.gender;
  const birthday = req.body.birthday;
  
  const user = new User({ 
    email, password, username, firstName, lastName, gender, birthday 
  });
  user
    .save()
    .then((user) => {
      console.log("User created, id:", user._id.toString());
      res.status(201).json({ message: "OK" });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json({ message: "Something went wrong" });
    });
  }

async function getAllUsers(req, res) {
      const users = await User.find();
      const token = generateToken(req.user_id);
      res.status(200).json({ users: users, token: token });
}

const UsersController = {
  create: create,
  getAllUsers: getAllUsers
};

module.exports = UsersController;
