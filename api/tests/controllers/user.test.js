const request = require("supertest");

const app = require("../../app");
const User = require("../../models/user");

require("../mongodb_helper");

describe("/users", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

////////////////////////////////////////////

  describe("get user ifo", () => {
  test("GET - given a user_id, it returns the (non sensitive) user information", async () => {
    const user1 = new User({
      email: "chris@email.com",
      password: "password",
      username: "marion",
      firstName: "Alexia",
      lastName: "Chris",
      gender: "both",
      birthday: new Date("1990-12-25"),
    })
    user1.save()
  
    const response = await request(app)
    .get(`/user?user=${user1._id}`);

    console.log("CONSOLE LOG = response.body")
    console.log(response.body)

    const userInfo = response.body.userInfo[0];
    expect(userInfo.username).toEqual("marion");
    expect(userInfo.firstName).toEqual("Alexia");
    expect(userInfo.lastName).toEqual("Chris");
    expect(userInfo.gender).toEqual("both");
    expect(new Date(userInfo.birthday)).toEqual(new Date('1990-12-25'));

  });
});
});
