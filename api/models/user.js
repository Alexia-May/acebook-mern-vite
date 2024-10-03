const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  username: String,
  firstName: String,
  lastName: String,
  gender: String,
  birthday: Date,
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  likedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post'}]

});

const User = mongoose.model("User", UserSchema);

module.exports = User;
