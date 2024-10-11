import createFetchMock from "vitest-fetch-mock";
import { describe, vi } from "vitest";
import { getConversations } from "../../src/services/conversations";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Mock fetch function
createFetchMock(vi).enableMocks();

describe("covnersations service", () => {
  describe("get conversations", () => {
    test("icnludes a token in its request", async () => {
      fetch.mockResponseOnce(JSON.stringify({ conversations: [], token: "newToken" }), {
        status: 200,
      });
      
      await getConversations("testToken");
  
      // This is an array of the arguments that were last passed to fetch
      const fetchArguments = fetch.mock.lastCall;
      const url = fetchArguments[0];
      const options = fetchArguments[1];
  
      expect(url).toEqual(`${BACKEND_URL}/conversations`);
      expect(options.method).toEqual("POST");
      expect(options.headers["Authorization"]).toEqual("Bearer testToken");
    })
  })
})