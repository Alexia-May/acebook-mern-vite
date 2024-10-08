import createFetchMock from "vitest-fetch-mock";
import { describe, expect, vi } from "vitest";
import { getUserInfo } from "../../src/services/user";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

createFetchMock(vi).enableMocks();

describe("get user info", () => {

    test("includes a token & user info with its request", async () => {
        fetch.mockResponseOnce(JSON.stringify({ posts: [], token: "newToken" }), {
          status: 200,
        });
  
        const userID = 123 
        await getUserInfo("testToken", userID);
  
        const fetchArguments = fetch.mock.lastCall;
        const url = fetchArguments[0];
        const options = fetchArguments[1];
  
        expect(url).toEqual(`${BACKEND_URL}/user?userId=123`);
        expect(options.method).toEqual("GET");
        expect(options.headers["Authorization"]).toEqual("Bearer testToken");
    });
});
