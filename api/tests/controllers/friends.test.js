const request = require("supertest");
const JWT = require("jsonwebtoken");

const app = require("../../app");
const User = require("../../models/user");
const mongoose = require("mongoose");
const { describe } = require("node:test");

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
let user;
let token;
describe("/friends", () => {
  beforeEach(async () => {
    user = new User({
      email: "post-test@test.com",
      password: "12345678",
      username: "testdummy",
      firstName: "test",
      lastName: "dummy",
      gender: "dummy",
      birthday: new Date("1989-11-12"),
    });
    await user.save();
    token = createToken(user.id);
  });

  afterEach(async () => {
    await User.deleteMany({});
  });
  describe("addFriend", () => {
    test("POST, when a valid token is present and valid query parameter", async () => {
      const user2 = new User({
        email: "chris@email.com",
        password: "password",
        username: "marion",
        firstName: "Alexia",
        lastName: "Chris",
        gender: "both",
        birthday: new Date("0000-12-25"),
      });

      await user2.save();

      const response = await request(app)
        .post(`/friends?userId=${user2._id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(200);
    });
    test("POST, when a valid token is present but an invalid query parameter", async () => {
      const user2 = new User({
        email: "chris@email.com",
        password: "password",
        username: "marion",
        firstName: "Alexia",
        lastName: "Chris",
        gender: "both",
        birthday: new Date("0000-12-25"),
      });
      await user2.save();

      const response = await request(app)
        .post(`/friends?userId=1234`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(500);
    });
  });
  test("POST, when valid, friend is appened to user friend list", async () => {
    const user2 = new User({
      email: "chris@email.com",
      password: "password",
      username: "marion",
      firstName: "Alexia",
      lastName: "Chris",
      gender: "both",
      birthday: new Date("0000-12-25"),
    });

    await user2.save();

    const response = await request(app)
      .post(`/friends?userId=${user2._id}`)
      .set("Authorization", `Bearer ${token}`);

    const userObject = await User.findOne({ _id: user._id });
    expect(userObject._id).toEqual(user._id);
    expect(userObject.friends).toEqual([user2._id]);
  });
  test("POST, if friend is already friend return error", async () => {
    const user2 = new User({
      email: "chris@email.com",
      password: "password",
      username: "marion",
      firstName: "Alexia",
      lastName: "Chris",
      gender: "both",
      birthday: new Date("0000-12-25"),
    });
    await user2.save();
    user.friends.push(user2);
    await user.save();

    const response = await request(app)
      .post(`/friends?userId=${user2._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(500);
  });
  describe("getFriends", () => {
    test("GET, when a token is valid, return 200 status", async () => {
      const response = await request(app)
        .get("/friends")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(200);
    });
    test("Get, returns all friends", async () => {
      const user2 = new User({
        email: "chris@email.com",
        password: "password",
        username: "marion",
        firstName: "Alexia",
        lastName: "Chris",
        gender: "both",
        birthday: new Date("0000-12-25"),
      });
      await user2.save();
      user.friends.push(user2);
      await user.save();

      const response = await request(app)
        .get("/friends")
        .set("Authorization", `Bearer ${token}`);

      const friends = response.body.friends;
      expect(friends.length).toEqual(1);
      expect(friends[0]._id).toEqual(user2._id.toString());
    });
  });

  describe("getNonFriendUsers", () => {
    test("GET, when a token is valid, return 200 status", async () => {
      const response = await request(app)
        .get("/friends/non")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(200);
    });
    test("GET, given friends return all other users expect logged in user", async () => {
      const user2 = new User({
        email: "chris@email.com",
        password: "password",
        username: "marion",
        firstName: "Alexia",
        lastName: "Chris",
        gender: "both",
        birthday: new Date("0000-12-25"),
      });
      await user2.save();
      user.friends.push(user2);
      await user.save();

      const user3 = new User({
        email: "email3@email.com",
        password: 1234,
        username: "janedoe",
        firstName: "Jane",
        lastName: "Doe",
        gender: "Female",
        birthday: new Date("1985-07-15"),
      });
  
      const user4 = new User({
        email: "email4@email.com",
        password: 1234,
        username: "alexjones",
        firstName: "Alex",
        lastName: "Jones",
        gender: "Non-binary",
        birthday: new Date("1990-11-20"),
      });

      await user3.save()
      await user4.save()

      const response = await request(app)
      .get("/friends/non")
      .set("Authorization", `Bearer ${token}`);

      const users = response.body.users

      expect(users.length).toEqual(2)
      expect(users[0].email).toEqual("email3@email.com")
      expect(users[1].email).toEqual("email4@email.com")
    });
  });
});
