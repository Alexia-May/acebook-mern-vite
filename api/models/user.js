const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: [true, 'Email is required'], unique: true,
    validate: { // allowing letters, digits, underscores, hyphens, and periods
      validator: function (email) { return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)}}},
  password: { type: String, required: [true, 'Password is required'],  
    validate: { // must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, one special character
    validator: function (password) { 
      return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(password)}}},
  username: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String, required: true },
  birthday: { type: Date, required: true },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  likedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
  friendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
