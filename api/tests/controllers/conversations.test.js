const request = require("supertest");
const JWT = require("jsonwebtoken");

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
const app = require("../../app");
const User = require("../../models/user");
const Conversation = require("../../models/conversation");
const Message = require("../../models/message");

require("../mongodb_helper");
let token;
let user1;
let user2;
describe("/users", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    await Conversation.deleteMany({});
    await Message.deleteMany({});
    user1 = new User({
      email: "email3@email.com",
      password: "aA1!12222",
      username: "bobmarley",
      firstName: "Bob",
      lastName: "Marley",
      gender: "Male",
      birthday: new Date("1945-02-06"),
    });

    user2 = new User({
      email: "email2@email.com",
      password: "aA1!12222",
      username: "johnsmith",
      firstName: "John",
      lastName: "Smith",
      gender: "Male",
      birthday: new Date("1967-03-08"),
    });

    await user1.save();
    await user2.save();

    token = createToken(user1._id);
    const conversation1 = new Conversation({
      participants: [user1._id, user2._id],
      updatedAt: new Date(),
    });

    await conversation1.save();

    const message1 = new Message({
      conversationId: conversation1._id,
      senderId: [user1._id],
      sentAt: new Date(),
      message: "Hello there.",
    });

    await message1.save();

    await Conversation.updateOne(
      { _id: conversation1._id },
      { lastMessage: message1._id }
    );
  });

  test("get request", async () => {
    const response = await request(app)
      .get("/conversations")
      .set("Authorization", `Bearer ${token}`);

    const conversations = response.body.conversations;
    console.log(conversations);

    expect(conversations.length).toEqual(1);
    expect(conversations[0].lastMessage.message).toEqual("Hello there.");
    expect(conversations[0].participants[0]._id).toEqual(user1._id.toString());
    expect(conversations[0].participants[1]._id).toEqual(user2._id.toString());
  });

});
