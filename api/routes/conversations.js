const express = require("express");
const router = express.Router();

const ConversationController = require("../controllers/conversation");

router.get("/", ConversationController.getUserConversations); // a http get request will fetch the posts

module.exports = router;

