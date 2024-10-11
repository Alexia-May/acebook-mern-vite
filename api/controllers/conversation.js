const Conversation = require("../models/conversation")
const Message = require("../models/message")
const { generateToken } = require("../lib/token");
const User = require("../models/user");

async function getUserConversations(req, res) {
  const conversations = await Conversation.find({participants: req.user_id}).populate('participants').populate('lastMessage');
  const token = generateToken(req.user_id);
  res.status(200).json({ conversations: conversations, token: token });
}
// async function getUserNonConversations(req, res) {
//   const conversations = await Conversation.find({participants: req.user_id}).populate('participants').populate('lastMessage');
//   const token = generateToken(req.user_id);
//   res.status(200).json({ conversations: conversations, token: token });
// }

async function createConversation(req, res) {
  const conversationObject = req.body
  const conversation = new Conversation(conversationObject);
  conversation.participants.push(req.user_id) 
  console.log("conversation", conversation)
  // console.log(conversationObject)
  conversation.save();


  const newToken = generateToken(req.user_id);
  res.status(201).json({ message: "Conversation created", token: newToken });
}

const ConversationsController = {
getUserConversations: getUserConversations,
createConversation: createConversation
};

module.exports = ConversationsController;
