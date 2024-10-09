const mongoose = require("mongoose");

async function connectToDatabase() {
  const mongoDbUrl = "mongodb://0.0.0.0/acebook";
  if (!mongoDbUrl) {
    console.error(
      "No MongoDB url provided. Make sure there is a MONGODB_URL environment variable set. See the README for more details."
    );
    throw new Error("No connection string provided");
  }
  await mongoose.connect(mongoDbUrl);
  console.log("Connected to database");
}
const User = require("../models/user");
const Post = require("../models/post");
const Message = require('../models/message')
const Conversation = require('../models/conversation')

async function seedData() {
  try {
    await connectToDatabase();
    await Post.deleteMany({});
    await User.deleteMany({});
    await Message.deleteMany({});
    await Conversation.deleteMany({});
    // Users
    const user1 = new User({
      email: "email1@email.com",
      password: "aA1!12222",
      username: "bobmarley",
      firstName: "Bob",
      lastName: "Marley",
      gender: "Male",
      birthday: new Date("1945-02-06"),
    });
    const user2 = new User({
      email: "email2@email.com",
      password: "aA1!12222",
      username: "johnsmith",
      firstName: "John",
      lastName: "Smith",
      gender: "Male",
      birthday: new Date("1967-03-08"),
    });
    const user3 = new User({
      email: "email3@email.com",
      password: 1234,
      password: "aA1!12222",
      username: "janedoe",
      firstName: "Jane",
      lastName: "Doe",
      gender: "Female",
      birthday: new Date("1985-07-15"),
    });
    const user4 = new User({
      email: "email4@email.com",
      password: "aA1!12222",
      username: "alexjones",
      firstName: "Alex",
      lastName: "Jones",
      gender: "Non-binary",
      birthday: new Date("1990-11-20"),
    });
    const user5 = new User({
      email: "email5@email.com",
      password: "aA1!12222",
      username: "samwilson",
      firstName: "Sam",
      lastName: "Wilson",
      gender: "Male",
      birthday: new Date("1978-05-10"),
    });
    // Save all users
    await user1.save();
    await user2.save();
    await user3.save();
    await user4.save();
    await user5.save();
    // Posts
    const post1 = new Post({
      message: "Hello world",
      dateCreated: new Date("2024-10-07"),
      user: user1._id,
    });
    const post2 = new Post({
      message: "Greetings from Jane!",
      dateCreated: new Date("2024-10-07"),
      user: user3._id,
    });
    const post3 = new Post({
      message: "Feeling great today!",
      dateCreated: new Date("2024-10-06"),
      user: user4._id,
    });
    const post4 = new Post({
      message: "Hello everyone, it's Sam.",
      dateCreated: new Date("2024-10-08"),
      user: user5._id,
    });
    const post5 = new Post({
      message: "Excited to join this platform!",
      dateCreated: new Date("2024-10-07"),
      user: user2._id,
    });
    const post6 = new Post({
      message: "Just finished reading a great book.",
      dateCreated: new Date("2024-10-09"),
      user: user3._id,
    });
    const post7 = new Post({
      message: "Learning new programming concepts!",
      dateCreated: new Date("2024-10-10"),
      user: user4._id,
    });
    const post8 = new Post({
      message: "Anyone up for a coffee chat?",
      dateCreated: new Date("2024-10-11"),
      user: user5._id,
    });
    // Save all posts
    await post1.save();
    await post2.save();
    await post3.save();
    await post4.save();
    await post5.save();
    await post6.save();
    await post7.save();
    await post8.save();
    // Conversations and Messages
    const conversation1 = new Conversation({
      participants: [user1._id, user2._id],
      updatedAt: new Date(),
    });
    const conversation2 = new Conversation({
      participants: [user2._id, user3._id],
      updatedAt: new Date(),
    });
    const conversation3 = new Conversation({
      participants: [user3._id, user4._id],
      updatedAt: new Date(),
    });
    const conversation4 = new Conversation({
      participants: [user4._id, user5._id],
      updatedAt: new Date(),
    });
    await conversation1.save();
    await conversation2.save();
    await conversation3.save();
    await conversation4.save();
    // Messages
    const message1 = new Message({
      conversationId: conversation1._id,
      senderId: user1._id,
      sentAt: new Date(),
      message: "Hello there, John!",
    });
    const message2 = new Message({
      conversationId: conversation1._id,
      senderId: user2._id,
      sentAt: new Date(),
      message: "Hi Bob! How's everything?",
    });
    const message3 = new Message({
      conversationId: conversation2._id,
      senderId: user2._id,
      sentAt: new Date(),
      message: "Hey Jane, long time no see!",
    });
    const message4 = new Message({
      conversationId: conversation2._id,
      senderId: user3._id,
      sentAt: new Date(),
      message: "Hey John! It's been a while, how have you been?",
    });
    const message5 = new Message({
      conversationId: conversation3._id,
      senderId: user3._id,
      sentAt: new Date(),
      message: "Hello Alex, have you read that article I sent you?",
    });
    const message6 = new Message({
      conversationId: conversation3._id,
      senderId: user4._id,
      sentAt: new Date(),
      message: "Yes, I did! It was really insightful, thanks!",
    });
    const message7 = new Message({
      conversationId: conversation4._id,
      senderId: user4._id,
      sentAt: new Date(),
      message: "Hey Sam, up for a game of chess sometime?",
    });
    const message8 = new Message({
      conversationId: conversation4._id,
      senderId: user5._id,
      sentAt: new Date(),
      message: "Absolutely! Let’s set a time.",
    });
    // Save all messages
    await message1.save();
    await message2.save();
    await message3.save();
    await message4.save();
    await message5.save();
    await message6.save();
    await message7.save();
    await message8.save();
    // Update conversations with the last message
    await Conversation.updateOne({ _id: conversation1._id }, { lastMessage: message2._id });
    await Conversation.updateOne({ _id: conversation2._id }, { lastMessage: message4._id });
    await Conversation.updateOne({ _id: conversation3._id }, { lastMessage: message6._id });
    await Conversation.updateOne({ _id: conversation4._id }, { lastMessage: message8._id });
    console.log("Data seeded successfully!");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await mongoose.connection.close();
    console.log("Database connection closed");
  }
}
// Run the seeding function
seedData();

