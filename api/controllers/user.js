const User = require("../models/user");
const { generateToken } = require("../lib/token");
const { tokenChecker } = require('../middleware/tokenChecker');


async function getAllUsers(req, res) {
  const users = await User.find();
  const token = generateToken(req.user_id);
  res.status(200).json({ users: users, token: token });
}

async function getUserInfo(req, res) {
    try {
      const token = generateToken(req.user_id); 
      let query = {}; 
      if (req.query.userId) { // query.user is user in the URL
        // checks user is in database
        const user = await User.findById(req.query.userId); // search db for user from query parameter
        if (user) { // check user is in database
          query.userId = user._id; // user id from db
        }
      } else {
        const user = await User.findById(req.user_id); // search db for logged in user
        if (user) { // check user is in database
          query.userId = user._id; // user id from db
        }
      }
      const userInfo = await User.find(query.userId, 'email username firstName lastName gender birthday');
      res.status(200).json({ userInfo: userInfo, token: token });
    } catch (error) {
      res.status(500).json({ message: "Error fetching user information", error: error.message });
    };
  };


const UserInfoController = {
  getUserInfo: getUserInfo,
  getAllUsers: getAllUsers
};

module.exports = UserInfoController;
