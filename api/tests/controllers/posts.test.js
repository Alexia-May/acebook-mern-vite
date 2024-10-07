const request = require("supertest");
const JWT = require("jsonwebtoken");

const app = require("../../app");
const Post = require("../../models/post");
const User = require("../../models/user");
const mongoose = require("mongoose");


require("../mongodb_helper");

const secret = process.env.JWT_SECRET;

function createToken(userId) {
  return JWT.sign(
    {
      user_id: userId,
      // Backdate this token of 5 minutes
      iat: Math.floor(Date.now() / 1000) - 5 * 60,
      // Set the JWT token to expire in 10 minutes
      exp: Math.floor(Date.now() / 1000) + 10 * 60,
    },
    secret
  );
}

let token;
describe("/posts", () => {
  beforeAll(async () => {
    const user = new User({
      email: "post-test@test.com",
      password: "12345678",
    });
    await user.save();
    await Post.deleteMany({});
    token = createToken(user.id);
  });

  afterEach(async () => {
    await User.deleteMany({});
    await Post.deleteMany({});
  });



  describe("POST, when a valid token is present", () => {
    test("responds with a 201", async () => {
      const response = await request(app)
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ message: "Hello World!" });
      expect(response.status).toEqual(201);
    });



    test("creates a new post", async () => {

      const user = new User({
        email: "post-test@test.com",
        password: "12345678",
        username: "alexia"
      });
      await user.save();

      const token = createToken(user._id)

      await request(app)
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ 
          message: "Hello World!!",
          dateCreated: new Date('2024-10-03'),
        });

      const posts = await Post.find().populate("user");
      expect(posts.length).toEqual(1);
      expect(posts[0].message).toEqual("Hello World!!");
      expect(posts[0].dateCreated).toEqual(new Date('2024-10-03'));
      expect(posts[0].user.username).toEqual("alexia");
    });

    test("returns a new token", async () => {
      const testApp = request(app);
      const response = await testApp
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ message: "hello world" });

      const newToken = response.body.token;
      const newTokenDecoded = JWT.decode(newToken, process.env.JWT_SECRET);
      const oldTokenDecoded = JWT.decode(token, process.env.JWT_SECRET);

      // iat stands for issued at
      expect(newTokenDecoded.iat > oldTokenDecoded.iat).toEqual(true);
    });
  });

  describe("POST, when token is missing", () => {
    test("responds with a 401", async () => {
      const response = await request(app)
        .post("/posts")
        .send({ message: "hello again world" });

      expect(response.status).toEqual(401);
    });

    test("a post is not created", async () => {
      const response = await request(app)
        .post("/posts")
        .send({ message: "hello again world" });

      const posts = await Post.find();
      expect(posts.length).toEqual(0);
    });

    test("a token is not returned", async () => {
      const response = await request(app)
        .post("/posts")
        .send({ message: "hello again world" });

      expect(response.body.token).toEqual(undefined);
    });
  });

  describe("GET, when token is present", () => {
    test("the response code is 200", async () => {
      const post1 = new Post({ message: "I love all my children equally" });
      const post2 = new Post({ message: "I've never cared for GOB" });
      await post1.save();
      await post2.save();

      const response = await request(app)
        .get("/posts")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(200);
    });

    test("returns multiple posts for a given specific user", async () => {
      const user1 = new User({
        email: "chris@email.com",
        password: "password",
        username: "marion",
        firstName: "Alexia",
        lastName: "Chris",
        gender: "both",
        birthday: new Date("0000-12-25"),
      })
      user1.save()
      
      const user2 = new User({
        email: "user2@email.com",
        password: "password",
        username: "user2",
        firstName: "user",
        lastName: "two",
        gender: "two",
        birthday: new Date("2002-10-01"),
      })
      user2.save()

      const post1 = new Post({ message: "howdy!", dateCreated: new Date("2024-10-02"), user: user1._id });
      const post2 = new Post({ message: "bonjour!", dateCreated: new Date("2020-11-22"), user: user1._id  });
      const post3 = new Post({ message: "hola!", dateCreated: new Date("2020-12-22"), user: user2._id });
      await post1.save();
      await post2.save();
      await post3.save();

      const response = await request(app)
      .get(`/posts?user=${user1._id}`)
      .set("Authorization", `Bearer ${token}`);
      
      const post = response.body.posts;
      const firstPost = post[0];
      const secondPost = post[1];
      // const thirdPost = post[2];

      expect(firstPost.message).toEqual("howdy!");
      expect(secondPost.message).toEqual("bonjour!");
      expect(firstPost.user._id).toEqual(user1._id.toString());
      expect(secondPost.user._id).toEqual(user1._id.toString());
      // expect(thirdPost.user._id).toEqual(user2._id.toString());

      expect(post.length).toEqual(2)

      expect(new Date(firstPost.dateCreated)).toEqual(new Date("2024-10-02"));
      expect(new Date(secondPost.dateCreated)).toEqual(new Date("2020-11-22"));
      
    });

    test("returns every post in the collection", async () => {
      const post1 = new Post({ message: "howdy!" });
      const post2 = new Post({ message: "hola!" });
      await post1.save();
      await post2.save();
      

      const response = await request(app)
        .get("/posts")
        .set("Authorization", `Bearer ${token}`);

      const posts = response.body.posts;
      const firstPost = posts[0];
      const secondPost = posts[1];

      expect(firstPost.message).toEqual("howdy!");
      expect(secondPost.message).toEqual("hola!");

    
    });

    test("returns post with user information", async () => {
      const user1 = new User({
        email: "chris@email.com",
        password: "password",
        username: "marion",
        firstName: "Alexia",
        lastName: "Chris",
        gender: "both",
        birthday: new Date("0000-12-25"),
      })
      user1.save()

      const post1 = new Post({
        message: "hello",
        dateCreated: new Date("2024-10-02"),
        user: user1._id
      })
      post1.save()

      const response = await request(app)
      .get("/posts")
      .set("Authorization", `Bearer ${token}`);

      const post = response.body.posts[0]
      expect(post.message).toEqual("hello")
      expect(new Date(post.dateCreated)).toEqual(new Date("2024-10-02"))
      expect(post.user.username).toEqual("marion")
      expect(post.user.password).toEqual(undefined)
    })

    test("returns a new token", async () => {
      const post1 = new Post({ message: "First Post!" });
      const post2 = new Post({ message: "Second Post!" });
      await post1.save();
      await post2.save();

      const response = await request(app)
        .get("/posts")
        .set("Authorization", `Bearer ${token}`);

      const newToken = response.body.token;
      const newTokenDecoded = JWT.decode(newToken, process.env.JWT_SECRET);
      const oldTokenDecoded = JWT.decode(token, process.env.JWT_SECRET);

      // iat stands for issued at
      expect(newTokenDecoded.iat > oldTokenDecoded.iat).toEqual(true);
    });
  });

  describe("GET, when token is missing", () => {
    test("the response code is 401", async () => {
      const post1 = new Post({ message: "howdy!" });
      const post2 = new Post({ message: "hola!" });
      await post1.save();
      await post2.save();

      const response = await request(app).get("/posts");

      expect(response.status).toEqual(401);
    });

    test("returns no posts", async () => {
      const post1 = new Post({ message: "howdy!" });
      const post2 = new Post({ message: "hola!" });
      await post1.save();
      await post2.save();

      const response = await request(app).get("/posts");

      expect(response.body.posts).toEqual(undefined);
    });

    test("does not return a new token", async () => {
      const post1 = new Post({ message: "howdy!" });
      const post2 = new Post({ message: "hola!" });
      await post1.save();
      await post2.save();

      const response = await request(app).get("/posts");

      expect(response.body.token).toEqual(undefined);
    });
  });
});

describe("DELETE /posts/:id", () => {
  let token;
  let user1;
  let post1;

  beforeEach(async () => {
    user1 = new User({
      email: "chris@email.com",
      password: "password",
      username: "marion",
      firstName: "Alexia",
      lastName: "Chris",
      gender: "both",
      birthday: new Date("0000-12-25"),
    });
    await user1.save();

    token = createToken(user1.id);

    const user2 = new User({
      email: "user2@email.com",
      password: "password",
      username: "user2",
      firstName: "user",
      lastName: "two",
      gender: "two",
      birthday: new Date("2002-10-01"),
    })
    user2.save()

    post1 = new Post({
      message: "hello",
      dateCreated: new Date("2024-10-02"),
      user: user1._id,
    });
    await post1.save();

    post2 = new Post({
      message: "hello",
      dateCreated: new Date("2024-10-02"),
      user: user2._id,
    });
    await post2.save();
  });

  afterEach(async () => {
    await User.deleteMany({});
    await Post.deleteMany({});
  });

  test("responds with 200 when post is successfully deleted", async () => {
    const response = await request(app)
      .delete(`/posts/${post1.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toEqual(200);
    expect(response.body.message).toEqual("Post deleted");
  });

  test("responds with 404 if post does not exist", async () => {
    const invalidPostId = new mongoose.Types.ObjectId(); // Creating a random valid ObjectId
    const response = await request(app)
      .delete(`/posts/${invalidPostId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toEqual(404);
    expect(response.body.message).toEqual("Post not found");
  });

  test("responds with 403 if user is not authorized", async () => {

    const response = await request(app)
      .delete(`/posts/${post2._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toEqual(403);
    expect(response.body.message).toEqual("Unauthorized to delete this post");
  });
});

