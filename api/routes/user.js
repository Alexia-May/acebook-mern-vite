const express = require("express");

const UserInfoController = require("../controllers/user");

const router = express.Router();

router.get("/", UserInfoController.getUserInfo);
router.get("/all", UserInfoController.getAllUsers);


module.exports = router;
