import createFetchMock from "vitest-fetch-mock";
import { describe, expect, vi } from "vitest";

// importing the functions we want to test
import { getPosts } from "../../src/services/posts";
import { createPost } from "../../src/services/posts";
import { deletePost } from "../../src/services/posts";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Mock fetch function
createFetchMock(vi).enableMocks();

describe("posts service", () => {
  // tests for get post
  describe("getPosts", () => {
    test("includes a token and no user id (empty string) with its request", async () => {
      fetch.mockResponseOnce(JSON.stringify({ posts: [], token: "newToken" }), {
        status: 200,
      });

      await getPosts("testToken", "");

      // This is an array of the arguments that were last passed to fetch
      const fetchArguments = fetch.mock.lastCall;
      const url = fetchArguments[0];
      const options = fetchArguments[1];

      expect(url).toEqual(`${BACKEND_URL}/posts`);
      expect(options.method).toEqual("GET");
      expect(options.headers["Authorization"]).toEqual("Bearer testToken");
    });
    
    test("rejects with an error if the status is not 200", async () => {
      fetch.mockResponseOnce(
        JSON.stringify({ message: "Something went wrong" }),
        { status: 400 }
      );

      try {
        await getPosts("testToken");
      } catch (err) {
        expect(err.message).toEqual("Unable to fetch posts");
      }
    });


    test("includes a token & user id with its request", async () => {
      fetch.mockResponseOnce(JSON.stringify({ posts: [], token: "newToken" }), {
        status: 200,
      });

      const userID = 123 
      await getPosts("testToken", userID);

      // This is an array of the arguments that were last passed to fetch
      const fetchArguments = fetch.mock.lastCall;
      const url = fetchArguments[0];
      const options = fetchArguments[1];

      expect(url).toEqual(`${BACKEND_URL}/posts?userId=123`);
      expect(options.method).toEqual("GET");
      expect(options.headers["Authorization"]).toEqual("Bearer testToken");
    });
  });

  
  // tests for create a post 
  describe("createPost", () => {
    // testing that there is a token as we need the user to be logged in
    //and the new post to have an associated userid
    test("includes a token in the request", async () => {
      fetch.mockResponseOnce(JSON.stringify({ message: "Post created", token: "newToken" }), {
        status: 201,
      })
      
      const post = {
        message: "test message",
        dateCreated: "test date",
        user: "test user id"
      }

      await createPost("testToken", post)
      
      // This is an array of the arguments that were last passed to fetch
      const fetchArguments = fetch.mock.lastCall;
      const url = fetchArguments[0];
      const options = fetchArguments[1];

      expect(url).toEqual(`${BACKEND_URL}/posts`);
      expect(options.method).toEqual("POST");
      expect(options.headers["Authorization"]).toEqual("Bearer testToken");
    })
    // testing that the post object passed a parameter in the createPost function
    // is then sent with the post request as the body
    test("includes a token and body in the request", async () => {
      fetch.mockResponseOnce(JSON.stringify({ message: "Post created", token: "newToken" }), {
        status: 201,
      })
      
      const post = {
        message: "test message",
        dateCreated: "test date",
        user: "test user id"
      }

      await createPost("testToken", post)
      
      // This is an array of the arguments that were last passed to fetch
      const fetchArguments = fetch.mock.lastCall;
      const url = fetchArguments[0];
      const options = fetchArguments[1];

      expect(url).toEqual(`${BACKEND_URL}/posts`);
      expect(options.method).toEqual("POST");
      expect(options.headers["Authorization"]).toEqual("Bearer testToken");
      expect(options.body).toEqual(JSON.stringify(post))
    })

    // testing the response & error message
    test("rejects with an error if the status is not 201", async () => {
      fetch.mockResponseOnce(
        JSON.stringify({ message: "Something went wrong" }),
        { status: 400 }
      );

      try {
        await createPost("testToken");
      } catch (err) {
        expect(err.message).toEqual("Unable to create a post");
      }
    });
  })

  // Testing delete post service
  describe("deletePost", () => {
    test("includes a token and post id in the request", async () => {
      fetch.mockResponseOnce(JSON.stringify({ message: "Post deleted", token: "newToken" }), {
        status: 200,
      });
  
      const postId = "66ffee1c0e13ab89752dd1a7";
  
      await deletePost("testToken", postId);
  
      const fetchArguments = fetch.mock.lastCall;
      const url = fetchArguments[0];
      const options = fetchArguments[1];
  
      expect(url).toEqual(`${BACKEND_URL}/posts/${postId}`);
      expect(options.method).toEqual("DELETE");
      expect(options.headers["Authorization"]).toEqual("Bearer testToken");
    });
  
    test("rejects with an error if the status is not 200", async () => {
      fetch.mockResponseOnce(
        JSON.stringify({ message: "Unable to delete post" }),
        { status: 400 }
      );
  
      const postId = "66ffee1c0e13ab89752dd1a7";
  
      try {
        await deletePost("testToken", postId);
      } catch (err) {
        expect(err.message).toEqual("Unable to delete post");
      }
    });
  });
  
});
