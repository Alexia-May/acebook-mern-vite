const User = require("../models/user");
const { generateToken } = require("../lib/token");
const Conversation = require('../models/conversation')
async function addFriend(req, res) {
  try {
    console.log("hello")
    const user = await User.findById(req.user_id);
    const friend = await User.findById(req.query.userId);
    if (
      friend.friendRequests.includes(user._id) ||
      user.friends.includes(friend._id)
    ) {
      res
        .status(500)
        .json({ message: "User is already friends", error: err.message });
    }
    friend.friendRequests.push(user);
    await friend.save();
    const token = generateToken(req.user_id);
    res.status(200).json({ message: "Friend added", token: token });
  } catch (err) {
    const token = generateToken(req.user_id);
    res.status(500).json({
      message: "Can not add friend",
      error: err.message,
      token: token,
    });
  }
}
async function declineFriendRequest(req, res) {
  try {
    const user = await User.findById(req.user_id);
    const friend = await User.findById(req.query.userId);
    if (user.friendRequests.includes(friend._id)) {
      user.friendRequests.pull(friend._id);
      await user.save();
      const token = generateToken(req.user_id);
      res
        .status(200)
        .json({ message: "Friend request declined", token: token });
    } else {
      res
        .status(500)
        .json({ message: "There is no friend request", error: err.message });
    }
  } catch (err) {
    const token = generateToken(req.user_id);
    res.status(500).json({
      message: "Can not decline request",
      error: err.message,
      token: token,
    });
  }
}

async function getFriends(req, res) {
  try {
    const token = generateToken(req.user_id);
    const user = await User.findById(req.user_id).populate(
      "friends",
      "email username firstName lastName gender birthday"
    );
    const friends = user.friends;
    res.status(200).json({ friends: friends, token: token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching posts", error: error.message });
  }
}

async function getNonFriendUsers(req, res) {
  try {
    const token = generateToken(req.user_id);
    const user = await User.findById(req.user_id).populate(
      "friends",
      "email username firstName lastName gender birthday"
    );
    const pendingRequests = await User.find({ friendRequests: user._id });
    // console.log("pending requests", pendingRequests);
    const friends = user.friends;
    // console.log("friends", friends);
    const users = await User.find({
      $and: [
        { _id: { $nin: friends } },
        { _id: { $nin: pendingRequests } },
        { _id: { $nin: user } },
      ],
    });
    res.status(200).json({ users: users, token: token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching posts", error: error.message });
  }
}
async function acceptFriendRequest(req, res) {
  try {
    const user = await User.findById(req.user_id);
    const friend = await User.findById(req.query.userId);
    if (user.friendRequests.includes(friend._id)) {
      user.friendRequests.pull(friend._id);
      user.friends.push(friend._id);
      friend.friends.push(user._id);
      await user.save();
      await friend.save();
      const token = generateToken(req.user_id);
      res.status(200).json({ message: "Friend added", token: token });
    } else {
      res
        .status(500)
        .json({ message: "User is already friends", error: err.message });
    }
  } catch (err) {
    const token = generateToken(req.user_id);
    res.status(500).json({
      message: "Can not add friend",
      error: err.message,
      token: token,
    });
  }
}

async function getFriendRequests(req, res) {
  try {
    const token = generateToken(req.user_id);
    const user = await User.findById(req.user_id).populate(
      "friendRequests",
      "email username firstName lastName gender birthday"
    );
    const friendRequests = user.friendRequests;
    res.status(200).json({ friendRequests: friendRequests, token: token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching posts", error: error.message });
  }
}

async function getPendingFriendRequests(req, res) {
  try {
    const token = generateToken(req.user_id);
    const user = await User.findById(req.user_id);
    const pendingRequests = await User.find({ friendRequests: user._id });
    res.status(200).json({ pendingRequests: pendingRequests, token: token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching posts", error: error.message });
  }
}
async function cancelFriendRequest(req, res) {
  try {
    const user = await User.findById(req.user_id);
    const friend = await User.findById(req.query.userId);
    if (friend.friendRequests.includes(user._id)) {

      friend.friendRequests.pull(user._id);
      await friend.save();
      const token = generateToken(req.user_id);
      res
        .status(200)
        .json({ message: "Friend request cancelled", token: token });
    } else {
      res
        .status(500)
        .json({ message: "There is no friend request", error: err.message });
    }
  } catch (err) {
    const token = generateToken(req.user_id);
    res.status(500).json({
      message: "Can not cancel request",
      error: err.message,
      token: token,
    });
  }
}

async function deleteFriend(req, res) {
  try {

    const token = generateToken(req.user_id)
    const user = await User.findById(req.user_id)
    const friend = await User.findById(req.query.userId);
    user.friends.pull(friend)
    await user.save()
    res.status(200).json({ message: "A friend has been deleted", token: token})
  } catch (err) {
    res.status(500).json({ message: "Unable to delete friend", error: err.message})
  }
}

// async function getFriendsByNoConversation(req, res) {
//   try {
//     const conversations = await Conversation.find()
//     const token = generateToken(req.user_id);
//     const user = await User.findById(req.user_id);
//     const friends = await User.find({ friendRequests: user._id });
//     res.status(200).json({ pendingRequests: pendingRequests, token: token });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error fetching posts", error: error.message });
//   }
// }
const FriendsController = {
  addFriend,
  getFriends,
  getNonFriendUsers,
  acceptFriendRequest,
  getFriendRequests,
  declineFriendRequest,
  getPendingFriendRequests,
  cancelFriendRequest,
  deleteFriend
};

module.exports = FriendsController;
