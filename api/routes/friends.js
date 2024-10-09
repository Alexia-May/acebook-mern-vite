const express = require("express");
const router = express.Router();

const Friendscontroller = require("../controllers/friends");

router.post("/", Friendscontroller.addFriend); 
router.post("/accept", Friendscontroller.acceptFriendRequest)
router.delete("/accept", Friendscontroller.declineFriendRequest)
router.get("/", Friendscontroller.getFriends)
router.get("/non", Friendscontroller.getNonFriendUsers)
router.get("/requests", Friendscontroller.getFriendRequests)
router.get("/requests/pending", Friendscontroller.getPendingFriendRequests)
router.delete("/requests/pending", Friendscontroller.cancelFriendRequest)
module.exports = router;
