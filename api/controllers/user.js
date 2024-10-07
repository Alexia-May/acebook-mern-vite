const User = require("../models/user");
const { generateToken } = require("../lib/token");
const { tokenChecker } = require('../middleware/tokenChecker');


async function getUserInfo(req, res) {
    try {
      const token = generateToken(req.user_id); 
      let query = {}; 
      if (req.query.user) {
        const user = await User.findById(req.query.user);
        if (user) {
          query.user = user._id;
        }
      }
      const userInfo = await User.find(query.user, 'username firstName lastName gender birthday');
      res.status(200).json({ userInfo: userInfo, token: token });
    } catch (error) {
      res.status(500).json({ message: "Error fetching posts", error: error.message });
    };
  };


const UserInfoController = {
  getUserInfo: getUserInfo
};

module.exports = UserInfoController;
