const express = require("express");
const router = express.Router();

const MessagesController = require('../controllers/message')

router.get("/", MessagesController.getMessagesByConversation); // a http get request will fetch the posts
router.post("/", MessagesController.sendMessage); // a http get request will fetch the posts

module.exports = router;

