import {  UserPage } from "../../src/pages/User/UserPage";
import { MemoryRouter, Route } from "react-router-dom";
import { vi } from "vitest";
import { getUserInfo } from "../../src/services/user";
import { Routes } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { getPosts } from "../../src/services/posts";
import { act } from "react-dom/test-utils";
import { getFriends } from "../../src/services/friends";


vi.mock("../../src/services/user", () => {
  const getUserInfoMock = vi.fn();
  return { getUserInfo: getUserInfoMock };

});

vi.mock("../../src/services/posts", () => {
  const getPostsMock = vi.fn();
  return { getPosts: getPostsMock };
});

vi.mock("../../src/services/friends", () => {
  const getFriendsMock = vi.fn();
  return { getFriends: getFriendsMock };
});

describe("UserPage", () => {
  beforeEach(async () => {
    window.localStorage.removeItem("token");
    await getUserInfo.mockResolvedValue({
      userInfo: [{
        username: "testuser1",
      }],
      token: "newToken",
    });
    await getPosts.mockResolvedValue({
      posts: [],
      token: "newToken",
    });
    await getFriends.mockResolvedValue({
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
    expect(getUserInfo).toHaveBeenCalledWith("testToken", "1234");

    // step 4: assert username on page matches user object
    const username = await screen.getByTestId("username-heading");
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
  test("when the page is loaded the user's friends are fetch from the back end", async () => {
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
    expect(getFriends).toHaveBeenCalledWith("testToken");
  })
  test("if the user is a friend the add friend component isnt loaded", async () => {
    window.localStorage.setItem("token", "testToken");
    await getFriends.mockResolvedValue({
      friends: [
        {_id: "12345"},
        {_id: "12346"}
      ]
    })
    await getUserInfo.mockResolvedValue({
      userInfo: [{
        _id: "12345",
        username: "testuser1",
      }],
      token: "newToken",
    });
    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/user/1234"]}>
          <Routes>
            <Route path="/user/:userId" element={<UserPage />} />
          </Routes>
        </MemoryRouter>
      );
    });
    const buttonEls = await screen.findAllByRole("button")
    expect(buttonEls[1].textContent).toEqual("Remove Friend")
  })
  test("if the user isnt a friend the add friend component is loaded", async () => {
    window.localStorage.setItem("token", "testToken");
    await getFriends.mockResolvedValue({
      friends: [
        {_id: "12345"},
        {_id: "12346"}
      ]
    })
    await getUserInfo.mockResolvedValue({
      userInfo: [{
        _id: "1234",
        username: "testuser1",
      }],
      token: "newToken",
    });
    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/user/1234"]}>
          <Routes>
            <Route path="/user/:userId" element={<UserPage />} />
          </Routes>
        </MemoryRouter>
      );
    });
    const buttonEls = await screen.findAllByRole("button")
    expect(buttonEls[1].textContent).toEqual("Add Friend")
  })
});
