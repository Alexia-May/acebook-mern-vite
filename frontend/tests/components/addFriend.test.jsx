import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { AddFriend } from "../../src/components/AddFriend";

import { addFriend } from "../../src/services/friends";

vi.mock("../../src/services/friends", () => {
  const addFriendMock = vi.fn();
  return { addFriend: addFriendMock };
});

describe("Add Friend Component", () => {
  beforeEach(() => {
    window.localStorage.removeItem("token");
  });

  test("Component renders", () => {
    render(<AddFriend />);

    const button = screen.getByRole("button");

    expect(button.textContent).toEqual("Add Friend");
  });

  test("when a user clicks on add friend, addFriend is called with a token and the given userId", async () => {
    window.localStorage.setItem("token", "testToken");
    render(<AddFriend userId={"1234"}/>);

    const user = userEvent.setup();

    const button = screen.getByRole("button");

    await user.click(button);

    expect(addFriend).toHaveBeenCalledWith("testToken", "1234");
  });
});
