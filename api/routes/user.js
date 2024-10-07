const express = require("express");

const UserInfoController = require("../controllers/user");

const router = express.Router();

router.get("/", UserInfoController.getUserInfo);

module.exports = router;
