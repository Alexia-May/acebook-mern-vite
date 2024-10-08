import {  UserPage } from "../../src/pages/User/UserPage";
import { MemoryRouter, Route } from "react-router-dom";
import { vi } from "vitest";
import { getUser } from "../../src/services/users";
import { Routes } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { getPosts } from "../../src/services/posts";
import { act } from "react-dom/test-utils";
vi.mock("../../src/services/users", () => {
  const getUserMock = vi.fn();
  return { getUser: getUserMock };
});

vi.mock("../../src/services/posts", () => {
  const getPostsMock = vi.fn();
  return { getPosts: getPostsMock };
});

describe("UserPage", () => {
  beforeEach(async () => {
    window.localStorage.removeItem("token");
    await getUser.mockResolvedValue({
      user: {
        username: "testuser1",
      },
      token: "newToken",
    });
    await getPosts.mockResolvedValue({
      posts: [],
      token: "newToken",
    });
  });

  test("given a url the user is taken to a page and a username is displayed", async () => {
    window.localStorage.setItem("token", "testToken");
    // given /user/1234 the api should return the user object and the page
    // should display that user's username in the userPage component

    // step 1: mock getUser returns user object
    // step 2: go to url
    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/user/1234"]}>
          <Routes>
            <Route path="/user/:userId" element={<UserPage />} />
          </Routes>
        </MemoryRouter>
      );
    });
    // step 3: assert getUser was called with id of 1234
    expect(getUser).toHaveBeenCalledWith("testToken", "1234");

    // step 4: assert username on page matches user object
    const username = await screen.findByTestId("username-heading");
    expect(username.textContent).toEqual("testuser1's Profile");
  });

  test("given a url the user is taken to a page and that users posts are displayed", async () => {
    window.localStorage.setItem("token", "testToken");

    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/user/1234"]}>
          <Routes>
            <Route path="/user/:userId" element={<UserPage />} />
          </Routes>
        </MemoryRouter>
      );
    });
    expect(getPosts).toHaveBeenCalledWith("testToken", "1234");
  });
});
