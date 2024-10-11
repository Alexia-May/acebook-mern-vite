const Conversation = require("../models/conversation");
const Message = require("../models/message");
const User = require("../models/user");
const { generateToken } = require("../lib/token");

async function getMessagesByConversation(req, res) {
  try {
    const token = generateToken(req.user_id);
    const conversation = await Conversation.findById(req.query.conversationId);
    const messages = await Message.find({
      conversationId: conversation._id,
    }).populate("senderId");
    res.status(200).json({ messages: messages, token: token });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error fetching user information",
        error: error.message,
      });
  }
}
async function sendMessage(req, res) {
  const messageObject = req.body;
  messageObject.senderId = req.user_id;
  messageObject.conversationId = req.query.conversationId;
  const message = new Message(messageObject);
  await Conversation.updateOne(
    { _id: req.query.conversationId },
    { lastMessage: message }
  );
  await message.save();

  const newToken = generateToken(req.user_id);
  res.status(201).json({ message: "Message created", token: newToken });
}

const MessagesController = {
  getMessagesByConversation: getMessagesByConversation,
  sendMessage: sendMessage,
};

module.exports = MessagesController;
