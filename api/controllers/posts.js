const Post = require("../models/post");
const { generateToken } = require("../lib/token");
const User = require("../models/user");
const { tokenChecker } = require('../middleware/tokenChecker')

async function getAllPosts(req, res) {
    try {
      const token = generateToken(req.user_id); 
      let query = {}; 
      if (req.query.user) {
        const user = await User.findById(req.query.user);
        // If the user is found, add the user filter to the query
        if (user) {
          query.user = user._id;
        }
      }
      // Find posts (filtered by user if applicable, or all posts if no user or user not found)
      const posts = await Post.find(query).populate('user', 'username', 'firstName');
      res.status(200).json({ posts: posts, token: token });
    } catch (error) {
      res.status(500).json({ message: "Error fetching posts", error: error.message });
    };
  };

async function createPost(req, res) {
  const postObject = req.body
  postObject.user = req.user_id
  const post = new Post(postObject);
  post.save();

  const newToken = generateToken(req.user_id);
  res.status(201).json({ message: "Post created", token: newToken });
}

async function deletePost(req, res) {
  try {
    const postId = req.params.id;

    // Find the post by ID
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Authorization check
    if (post.user.toString() !== req.user_id) {
      return res.status(403).json({ message: "Unauthorized to delete this post" });
    }

    // Delete the post
    await post.deleteOne(post);
    const newToken = generateToken(req.user_id);

    
    res.status(200).json({ message: "Post deleted", token: newToken });
  } catch (error) {
    console.error("Error deleting post:", error); // Log the error
    res.status(500).json({ message: "Server error", error: error.message });
  }
}


const PostsController = {
  getAllPosts,
  createPost,
  deletePost,
};

module.exports = PostsController;