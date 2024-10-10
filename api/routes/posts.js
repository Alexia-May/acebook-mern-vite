const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");
const AuthenticationController = require("../controllers/authentication");

router.get("/", PostsController.getAllPosts); // a http get request will fetch the posts
router.post("/", PostsController.createPost); // a http post request will create the post as defined in api/controllers/posts.js
router.delete("/:id", PostsController.deletePost);
router.post("/addlike/:id", PostsController.addLike);
router.post("/deletelike/:id", PostsController.deleteLike);
// Change to posts/:id ????

module.exports = router;
