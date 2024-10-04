require("../mongodb_helper");

const Post = require("../../models/post");
const User = require("../../models/user");

describe("Post model", () => {
  beforeEach(async () => {
    await Post.deleteMany({});
    await User.deleteMany({});
  });
  it("given a list of one like, the user document is returned", async () => {
    const user = new User({ 
      email: "someone@example.com",
      password: "password",
    });
    await user.save();
    const post = new Post({
      message: "some message",
      likes: [user._id],
    });
    await post.save();

    const postDocument = await Post.findOne({
      message: "some message",
    }).populate("likes");

    expect(postDocument.likes.length).toEqual(1);
    expect(postDocument.likes[0].email).toEqual("someone@example.com");
  });
  it("given a list of likes, the user documents is returned", async () => {
    const user1 = new User({
      email: "someone1@example.com",
      password: "password",
    });
    const user2 = new User({
      email: "someone2@example.com",
      password: "password",
    });
    const user3 = new User({
      email: "someone3@example.com",
      password: "password",
    });
    await user1.save();
    await user2.save();
    await user3.save();

    const post = new Post({
      message: "some message",
      likes: [user1._id, user2._id],
    });
    await post.save();

    const postDocument = await Post.findOne({
      message: "some message",
    }).populate("likes");

    expect(postDocument.likes.length).toEqual(2);
    expect(postDocument.likes[0].email).toEqual("someone1@example.com");
    expect(postDocument.likes[1].email).toEqual("someone2@example.com");
  });

  it("given a user who created the post, it should return user document", async () => {
    const user1 = new User({
      email: "someone1@example.com",
      password: "password",
    });
    await user1.save();
    const post = new Post({
      message: "some message",
      user: user1._id
    });
    await post.save();

    const postDocument = await Post
    .find()
    .populate("user")

    expect(postDocument[0].user.email).toEqual("someone1@example.com")
    expect(postDocument[0].user.password).toEqual("password")
  })
  it("given multiple posts and user, it list of posts for a given user", async () => {
    const user1 = new User({
      email: "someone1@example.com",
      password: "password",
    });
    await user1.save();

    const user2 = new User({
      email: "someone2@example.com",
      password: "password",
    });
    await user2.save();

    const post1 = new Post({
      message: "some message",
      user: user1._id
    });
    await post1.save();

    const post2 = new Post({
      message: "some other message",
      user: user1._id
    });
    await post2.save();

    const post3 = new Post({
      message: "some different message",
      user: user2._id
    });
    await post3.save();

    const postDocument = await Post
    .find({ user: user1._id })
    .populate({
      path: 'user',
    })


    expect(postDocument.length).toEqual(2)
    expect(postDocument[0].user.email).toEqual("someone1@example.com")
    expect(postDocument[1].user.email).toEqual("someone1@example.com")
  })
  
});

describe("User model", () => {
  beforeEach(async () => {
    await Post.deleteMany({});
    await User.deleteMany({});
  })
  it("should return user's liked post", async () => {
    const post1 = new Post({
      message: "post1 message",
    })
    await post1.save()
    const post2 = new Post({
      message: "post2 message",
    })
    await post2.save()
    
    const user = new User({
      email: "someone@example.com",
      password: "password",
      likedPosts: [post1._id, post2._id]
    });
    await user.save()

    const userDocument = await User
    .findOne( {email: "someone@example.com"} )
    .populate("likedPosts")

    expect(userDocument.likedPosts[0].message).toEqual("post1 message")
    expect(userDocument.likedPosts[1].message).toEqual("post2 message")
  })
})


