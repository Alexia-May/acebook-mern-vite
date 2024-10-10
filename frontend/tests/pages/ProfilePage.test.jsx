import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ProfilePage } from "../../src/pages/Profile/ProfilePage";
import { act } from "react-dom/test-utils";
import { getPosts } from "../../src/services/posts";
import { getUserInfo } from "../../src/services/user";
import { vi } from "vitest";

vi.mock("../../src/services/user", () => {
  return { getUserInfo: vi.fn() }; // Mocking getUserInfo
});

vi.mock("../../src/services/posts", () => {
  return { getPosts: vi.fn() }; // Mocking getPosts
});


describe("Profile Page", () => {
  beforeEach(() => {
    window.localStorage.removeItem("token");
  });

  test("It displays a page heading", async () => {
    window.localStorage.setItem("token", "testToken");
    render( 
      <MemoryRouter>
        <ProfilePage />
      </MemoryRouter>
    );

    const heading = await screen.findByTestId("profile-heading");
    expect(heading.textContent).toEqual("Welcome to your profile");
  });


  test("When page is loading, all posts are fetched from the backend", async () => {
    window.localStorage.setItem("token", "testToken");
    // Mock the user and post
    getUserInfo.mockResolvedValue({
      userInfo: [{ _id: "testUserId" }],
      token: "newToken",
    });

    getPosts.mockResolvedValue({
      posts: [],
      token: "newToken",
    });

    await act(async () => {
      render(
        <MemoryRouter>
          <ProfilePage />
        </MemoryRouter>
      );
    });
    expect(getPosts).toHaveBeenCalledWith("testToken", "testUserId");
  });
});

