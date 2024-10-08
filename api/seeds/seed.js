const mongoose = require("mongoose");
async function connectToDatabase() {
  // put mongo url in 
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
async function seedData() {
  try {
    await connectToDatabase();
    await Post.deleteMany({});
    await User.deleteMany({});

    // Users
    const user1 = new User({
      email: "email1",
      password: 1234,
      username: "bobmarley",
      firstName: "Bob",
      lastName: "Marley",
      gender: "Male",
      birthday: new Date("1945-02-06"),
    });

    const user2 = new User({
      email: "email2",
      password: 1234,
      username: "johnsmith",
      firstName: "John",
      lastName: "Smith",
      gender: "Male",
      birthday: new Date("1967-03-08"),
    });

    const user3 = new User({
      email: "email3",
      password: 1234,
      username: "janedoe",
      firstName: "Jane",
      lastName: "Doe",
      gender: "Female",
      birthday: new Date("1985-07-15"),
    });

    const user4 = new User({
      email: "email4",
      password: 1234,
      username: "alexjones",
      firstName: "Alex",
      lastName: "Jones",
      gender: "Non-binary",
      birthday: new Date("1990-11-20"),
    });

    const user5 = new User({
      email: "email5",
      password: 1234,
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

    console.log("User created successfully");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await mongoose.connection.close();
    console.log("Database connection closed");
  }
}

// Run the seeding function
seedData();
