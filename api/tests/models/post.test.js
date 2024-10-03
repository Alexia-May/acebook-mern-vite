require("../mongodb_helper");

const Post = require("../../models/post");

describe("Post model", () => {
  beforeEach(async () => {
    await Post.deleteMany({});
  });

  it("has a message", () => {
    const post = new Post({ message: "some message" });
    expect(post.message).toEqual("some message");
  });

  it("has a date created", () => {
    const post = new Post({ dateCreated: new Date("2024-10-02") });
    expect(post.dateCreated).toEqual(new Date("2024-10-02"));
  })

  it("has a date edited", () => {
    const post = new Post({ dateEdited: new Date("2024-10-02") });
    expect(post.dateEdited).toEqual(new Date("2024-10-02"));
  })

  it("can list all posts", async () => {
    const posts = await Post.find();
    expect(posts).toEqual([]);
  });

  it("can save a post", async () => {
    const post = new Post({ message: "some message" });

    await post.save();
    const posts = await Post.find();
    expect(posts[0].message).toEqual("some message");
  });
});
