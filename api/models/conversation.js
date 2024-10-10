const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema({
  lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: 'Message'},
  participants: [ { type: mongoose.Schema.Types.ObjectId, ref: 'User'} ],
  updatedAt: Date
});

const Conversation = mongoose.model("Conversation", ConversationSchema);

module.exports = Conversation;
