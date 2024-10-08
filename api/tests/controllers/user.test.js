const request = require("supertest");
const JWT = require("jsonwebtoken");

const app = require("../../app");
const User = require("../../models/user");

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
describe("/user", () => {
  beforeEach(async () => {
      await User.deleteMany({});
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

  ////////////////////////////////////////////

  describe("get user info", () => {
    test("GET - given a user_id, it returns the (non sensitive) user information", async () => {
      const user1 = new User({
        email: "chris@email.com",
        password: "password",
        username: "marion",
        firstName: "Alexia",
        lastName: "Chris",
        gender: "both",
        birthday: new Date("1990-12-25"),
      });
      user1.save();

      const response = await request(app)
      .get(`/user?userId=${user1._id}`)
      .set("Authorization", `Bearer ${token}`);

      console.log("CONSOLE LOG = response.body");
      console.log(response.body);

      const userInfo = response.body.userInfo[0];
      expect(userInfo.username).toEqual("marion");
      expect(userInfo.firstName).toEqual("Alexia");
      expect(userInfo.lastName).toEqual("Chris");
      expect(userInfo.gender).toEqual("both");
      expect(new Date(userInfo.birthday)).toEqual(new Date("1990-12-25"));
    });

    
    test("GET - given a user_id, it returns a new token", async () => {
      const user1 = new User({
        email: "chris@email.com",
        password: "password",
        username: "marion",
        firstName: "Alexia",
        lastName: "Chris",
        gender: "both",
        birthday: new Date("1990-12-25"),
      });
      user1.save();

      const response = await request(app)
      .get(`/user?userId=${user1._id}`)
      .set("Authorization", `Bearer ${token}`);

      const newToken = response.body.token;
      const newTokenDecoded = JWT.decode(newToken, process.env.JWT_SECRET);
      const oldTokenDecoded = JWT.decode(token, process.env.JWT_SECRET);

      // iat stands for issued at
      expect(newTokenDecoded.iat > oldTokenDecoded.iat).toEqual(true);
      expect(newTokenDecoded.user_id).toEqual(user._id.toString())
    });
    test("GET - given no user_id as a query parameter, it returns the 200 status", async () => {
      const response = await request(app)
      .get("/user")
      .set("Authorization", `Bearer ${token}`)
      expect(response.status).toEqual(200);
    });

    
    test("GET - given no user_id as a query parameter, it returns the logged in users non sensitve information", async () => {
      const response = await request(app)
      .get("/user")
      .set("Authorization", `Bearer ${token}`)

      const userInfo = response.body.userInfo[0];

      expect(userInfo._id).toEqual(user._id.toString())
      expect(userInfo.email).toEqual("post-test@test.com")
      expect(userInfo.username).toEqual("testdummy")
      expect(userInfo.firstName).toEqual("test")
      expect(userInfo.lastName).toEqual("dummy")
      expect(userInfo.gender).toEqual("dummy")
      expect(new Date(userInfo.birthday)).toEqual(new Date("1989-11-12"))
    });

    
    test("GET - given no user_id as a query parameter, it returns only one users", async () => {
      const user1 = new User({
        email: "chris@email.com",
        password: "password",
        username: "marion",
        firstName: "Alexia",
        lastName: "Chris",
        gender: "both",
        birthday: new Date("1990-12-25"),
      });
      user1.save();
      
      const response = await request(app)
      .get("/user")
      .set("Authorization", `Bearer ${token}`)

      expect(response.body.userInfo.length).toEqual(1)

    });

    test("GET - given invalid token, 401 status is returned", async () => {
      const response = await request(app)
      .get("/user")

      expect(response.status).toEqual(401)
    });
    test("GET - given invalid user, 500 status is returned", async () => {
      const response = await request(app)
      .get("/user?userId=abc")
      .set("Authorization", `Bearer ${token}`)

      expect(response.status).toEqual(500)
    });
  });
});
