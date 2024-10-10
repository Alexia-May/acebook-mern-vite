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
      password: "aA1!12222",
      username: "someuser",
      firstName: "chris",
      lastName: "marion",
      gender: "some gender",
      birthday: new Date("2019-01-01")    });
    expect(user.email).toEqual("someone@example.com");
  });

  it("given an incorrect email address, won't save", async () => {
    const user = new User({
      email: "incorrect-email!",
      password: "aA1!12222",
      username: "someuser",
      firstName: "chris",
      lastName: "marion",
      gender: "some gender",
      birthday: new Date("2019-01-01"),
    });
  
    await expect(user.save()).rejects.toThrow()
  })

  it("has a password", () => {
    const user = new User({
      email: "someone@example.com",
      password: "aA1!12222",
      username: "someuser",
      firstName: "chris",
      lastName: "marion",
      gender: "some gender",
      birthday: new Date("2019-01-01")
    });
    expect(user.password).toEqual("aA1!12222");
  });

  it("has a username", () => {
    const user = new User({
      email: "someone@example.com",
      password: "aA1!12222",
      username: "someuser",
      firstName: "chris",
      lastName: "marion",
      gender: "some gender",
      birthday: new Date("2019-01-01")
    });
    expect(user.username).toEqual("someuser");
  })

  it("has a first name", () => {
    const user = new User({
      email: "someone@example.com",
      password: "aA1!12222",
      username: "someuser",
      firstName: "chris",
      username: "someuser",
      firstName: "chris",
      lastName: "marion",
      gender: "some gender",
      birthday: new Date("2019-01-01")
    });
    expect(user.firstName).toEqual("chris");
  })

  it("has a last name", () => {
    const user = new User({
      email: "someone@example.com",
      password: "aA1!12222",
      username: "someuser",
      firstName: "chris",
      lastName: "marion",
      gender: "some gender",
      birthday: new Date("2019-01-01")
    });
    expect(user.lastName).toEqual("marion");
  })

  it("has a gender", () => {
    const user = new User({
      email: "someone@example.com",
      password: "aA1!12222",
      username: "someuser",
      firstName: "chris",
      lastName: "marion",
      gender: "some gender",
      birthday: new Date("2019-01-01")
    });
    expect(user.gender).toEqual("some gender");
  })

  it("has a birthday", () => {
    const user = new User({
      email: "someone@example.com",
      password: "aA1!12222",
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
      password: "aA1!12222",
      username: "someuser",
      firstName: "chris",
      lastName: "marion",
      gender: "some gender",
      birthday: new Date("2019-01-01")
    });

    await user.save();
    const users = await User.find();

    expect(users[0].email).toEqual("someone@example.com");
    expect(users[0].password).toEqual("aA1!12222");
  });

  it("should return user's one and only friend", async () => {
    const friend = new User({
      email: "friend@example.com",
      password: "aA1!12222",
      username: "someuser",
      firstName: "chris",
      lastName: "marion",
      gender: "some gender",
      birthday: new Date("2019-01-01")
    })
    await friend.save()
    
    const user = new User({
      email: "someone@example.com",
      password: "aA1!12222",
      username: "someuser",
      firstName: "chris",
      lastName: "marion",
      gender: "some gender",
      birthday: new Date("2019-01-01"),
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
      password: "aA1!12222",
      username: "someuser",
      firstName: "chris",
      lastName: "marion",
      gender: "some gender",
      birthday: new Date("2019-01-01"),
    })
    await friend1.save()
    const friend2 = new User({
      email: "friend2@example.com",
      password: "aA1!12222",
      username: "someuser",
      firstName: "chris",
      lastName: "marion",
      gender: "some gender",
      birthday: new Date("2019-01-01"),
    })
    await friend2.save()
    
    const user = new User({
      email: "someone@example.com",
      password: "aA1!12222",
      username: "someuser",
      firstName: "chris",
      lastName: "marion",
      gender: "some gender",
      birthday: new Date("2019-01-01"),
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
      password: "aA1!12222",
      username: "someuser3",
      firstName: "christopher",
      lastName: "marianne",
      gender: "some gender",
      birthday: new Date("2019-01-01")
    })
    await friend1.save()
    const friend2 = new User({
      email: "friend2@example.com",
      password: "aA1!12222",
      username: "someuser1",
      firstName: "christoph",
      lastName: "marian",
      gender: "some gender!",
      birthday: new Date("2019-01-01")
    })
    await friend2.save()
    
    const user = new User({
      email: "someone@example.com",
      password: "aA1!12222",
      friends: [friend1._id],
      username: "someuser",
      firstName: "chris",
      lastName: "marion",
      gender: "some gender",
      birthday: new Date("2019-01-01")
    });
    await user.save()

    const userDocument = await User
    .findOne( {email: "someone@example.com"} )
    .populate("friends")

    expect(userDocument.friends[0].email).toEqual("friend1@example.com")
    expect(userDocument.friends.length).toEqual(1)
  })
  it("should return user's friend requests", async () => {
    const friend1 = new User({
      email: "friend1@example.com",
      password: "aA1!12222",
      username: "someuser",
      firstName: "chris",
      lastName: "marion",
      gender: "some gender",
      birthday: new Date("2019-01-01"),
    })
    await friend1.save()
    const friend2 = new User({
      email: "friend2@example.com",
      password: "aA1!12222",
      username: "someuser",
      firstName: "chris",
      lastName: "marion",
      gender: "some gender",
      birthday: new Date("2019-01-01"),
    })
    await friend2.save()
    
    const user = new User({
      email: "someone@example.com",
      password: "aA1!12222",
      username: "someuser",
      firstName: "chris",
      lastName: "marion",
      gender: "some gender",
      birthday: new Date("2019-01-01"),
      friendRequests: [friend1._id, friend2._id]
    });
    await user.save()

    const userDocument = await User
    .findOne( {email: "someone@example.com"} )
    .populate("friendRequests")

    expect(userDocument.friendRequests[0].email).toEqual("friend1@example.com")
    expect(userDocument.friendRequests[1].email).toEqual("friend2@example.com")
  })
});
