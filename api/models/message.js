const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  conversationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation'},
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  sentAt: Date,
  message: String
});

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;


