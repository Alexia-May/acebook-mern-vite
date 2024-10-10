import createFetchMock from "vitest-fetch-mock";
import { describe, vi } from "vitest";

import { getUser, getAllUsers } from "../../src/services/users";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Mock fetch function
createFetchMock(vi).enableMocks();

describe("users service", () => {
  // tests for get post
  describe("getUser", () => {
    
    test("rejects with an error if the status is not 200", async () => {
      fetch.mockResponseOnce(
        JSON.stringify({ message: "Something went wrong" }),
        { status: 400 }
      );
      const userId = 1234 // invalid
      try {
        await getUser("testToken", userId);
      } catch (err) {
        expect(err.message).toEqual("Unable to fetch user");
      }
    });


    test("includes a token & user id with its request", async () => {
      fetch.mockResponseOnce(JSON.stringify({ user: {}, token: "newToken" }), {
        status: 200,
      });

      const userID = 123 // valid
      await getUser("testToken", userID);

      // This is an array of the arguments that were last passed to fetch
      const fetchArguments = fetch.mock.lastCall;
      const url = fetchArguments[0];
      const options = fetchArguments[1];

      expect(url).toEqual(`${BACKEND_URL}/user?userId=123`);
      expect(options.method).toEqual("GET");
      expect(options.headers["Authorization"]).toEqual("Bearer testToken");
    });
  });
  describe("getAllUsers", () => {
    test("rejects with an error if the status is not 200", async () => {
      fetch.mockResponseOnce(
        JSON.stringify({ message: "Something went wrong" }),
        { status: 400 }
      );
      try {
        await getAllUsers("testToken");
      } catch (err) {
        expect(err.message).toEqual("Unable to fetch users");
      }
    });
    test("includes a token with its request", async () => {
      fetch.mockResponseOnce(JSON.stringify({ user: {}, token: "newToken" }), {
        status: 200,
      });

      await getAllUsers("testToken");

      // This is an array of the arguments that were last passed to fetch
      const fetchArguments = fetch.mock.lastCall;
      const url = fetchArguments[0];
      const options = fetchArguments[1];

      expect(url).toEqual(`${BACKEND_URL}/user/all`);
      expect(options.method).toEqual("GET");
      expect(options.headers["Authorization"]).toEqual("Bearer testToken");
    });
  })
});