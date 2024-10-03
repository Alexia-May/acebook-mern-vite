require("../mongodb_helper");
const { default: mongoose } = require("mongoose");
const User = require("../../models/user");

describe("User model", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  it("has an email address", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
    });
    expect(user.email).toEqual("someone@example.com");
  });

  it("has a password", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
    });
    expect(user.password).toEqual("password");
  });

  it("has a username", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
      username: "someuser"
    });
    expect(user.username).toEqual("someuser");
  })

  it("has a first name", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
      username: "someuser",
      firstName: "chris",
    });
    expect(user.firstName).toEqual("chris");
  })

  it("has a last name", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
      username: "someuser",
      firstName: "chris",
      lastName: "marion",
    });
    expect(user.lastName).toEqual("marion");
  })

  it("has a gender", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
      username: "someuser",
      firstName: "chris",
      lastName: "marion",
      gender: "some gender"
    });
    expect(user.gender).toEqual("some gender");
  })

  it("has a birthday", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
      username: "someuser",
      firstName: "chris",
      lastName: "marion",
      gender: "some gender",
      birthday: new Date("2019-01-01")
    });
    expect(user.birthday).toEqual(new Date("2019-01-01"));
  })

  it("can list all users", async () => {
    const users = await User.find();
    expect(users).toEqual([]);
  });

  it("can save a user", async () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
    });

    await user.save();
    const users = await User.find();

    expect(users[0].email).toEqual("someone@example.com");
    expect(users[0].password).toEqual("password");
  });

  it("should return user's one and only friend", async () => {
    const friend = new User({
      email: "friend@example.com",
      password: "password",
    })
    await friend.save()
    
    const user = new User({
      email: "someone@example.com",
      password: "password",
      friends: [friend._id]
    });
    await user.save()

    const userDocument = await User
    .findOne( {email: "someone@example.com"} )
    .populate("friends")

    expect(userDocument.friends[0].email).toEqual("friend@example.com")

  })

  it("should return user's friends", async () => {
    const friend1 = new User({
      email: "friend1@example.com",
      password: "password",
    })
    await friend1.save()
    const friend2 = new User({
      email: "friend2@example.com",
      password: "password",
    })
    await friend2.save()
    
    const user = new User({
      email: "someone@example.com",
      password: "password",
      friends: [friend1._id, friend2._id]
    });
    await user.save()

    const userDocument = await User
    .findOne( {email: "someone@example.com"} )
    .populate("friends")

    expect(userDocument.friends[0].email).toEqual("friend1@example.com")
    expect(userDocument.friends[1].email).toEqual("friend2@example.com")
  })

  it("given mulitple user, should return the users only friend", async () => {
    const friend1 = new User({
      email: "friend1@example.com",
      password: "password",
    })
    await friend1.save()
    const friend2 = new User({
      email: "friend2@example.com",
      password: "password",
    })
    await friend2.save()
    
    const user = new User({
      email: "someone@example.com",
      password: "password",
      friends: [friend1._id]
    });
    await user.save()

    const userDocument = await User
    .findOne( {email: "someone@example.com"} )
    .populate("friends")

    expect(userDocument.friends[0].email).toEqual("friend1@example.com")
    expect(userDocument.friends.length).toEqual(1)
  })
});
