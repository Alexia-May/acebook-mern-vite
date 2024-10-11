import { render, screen } from "@testing-library/react";
import  User from "../../src/components/User";

describe("user", () => {
  test("display all friends", () => {
    const user = {
      _id: 1234,
      username: "testname1",
    };

    render(<User _id={user._id} username={user.username} />);

    const usernameEl = screen.getByTestId("user-link");
    expect(usernameEl.textContent).toEqual("testname1");
  });

  test("1 - when user clicks on another user's username, they are navigated to their profile", () => {
    const user = {
      _id: 1234,
      username: "testname1",
    };

    render(<User _id={user._id} username={user.username} />);

    const link = screen.getByTestId("user-link").href

    expect(link).toBe('http://localhost:3000/user/1234')
  })

  test("2 - when user clicks on a different user's username, they are navigated to their profile", () => {
    const user = {
      _id: 12345,
      username: "testname2",
    };

    render(<User _id={user._id} username={user.username} />);

    const link = screen.getByTestId("user-link").href

    expect(link).toBe('http://localhost:3000/user/12345')
  })
});
