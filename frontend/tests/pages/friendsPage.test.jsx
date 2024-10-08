import { render, screen } from "@testing-library/react";
import { FriendsPage } from "../../src/pages/Friends/FriendsPage";
// import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../../src/services/users";
import { act } from "react-dom/test-utils";

// Mocking React Router's useNavigate function
vi.mock("react-router-dom", () => {
  const navigateMock = vi.fn();
  const useNavigateMock = () => navigateMock; // Create a mock function for useNavigate
  return { useNavigate: useNavigateMock };
});

vi.mock("../../src/services/users", () => {
  const getAllUsersMock = vi.fn();
  return { getAllUsers: getAllUsersMock };
});
describe("Testing Friends Page", () => {
  beforeEach(async () => {
    window.localStorage.removeItem("token");
    vi.resetAllMocks();
  });

  test("It displays the heading", async () => {
    window.localStorage.setItem("token", "testToken");
    await getAllUsers.mockResolvedValue({
      users: [],
      token: "newToken",
    });
    await act(async () => {
      render(<FriendsPage />);
    });

    const text = await screen.findByRole("heading", { level: 1 });
    expect(text.textContent).toEqual("Check out your Friends!");
  });

  test("It navigates to login if no token is present", async () => {
    await getAllUsers.mockResolvedValue({
      users: [],
      token: "newToken",
    });
    await act(async () => {
      render(<FriendsPage />);
    });
    const navigateMock = useNavigate();
    expect(navigateMock).toHaveBeenCalledWith("/login");
  });

  test("When page is loading all users are fetched from the backend", async () => {
    window.localStorage.setItem("token", "testToken");

    await getAllUsers.mockResolvedValue({
      users: [],
      token: "newToken",
    });
    await act(async () => {
      render(<FriendsPage />);
    });
    expect(getAllUsers).toHaveBeenCalledWith("testToken");
  });

  test("A user can see every user", async () => {
    window.localStorage.setItem("token", "testToken");
    await getAllUsers.mockResolvedValue({
      users: [
        {
          _id: 1234,
          username: "testuser1",
        },
        {
          _id: 1235,
          username: "testuser2",
        },
        {
          _id: 1236,
          username: "testuser3",
        },
      ],
      token: "newToken",
    });
    await act(async () => {
      render(<FriendsPage />);
    });

    const usernameEls = screen.getAllByTestId("user-link");
    expect(usernameEls[0].textContent).toEqual("testuser1")
    expect(usernameEls[1].textContent).toEqual("testuser2")
    expect(usernameEls[2].textContent).toEqual("testuser3")
  });
});
