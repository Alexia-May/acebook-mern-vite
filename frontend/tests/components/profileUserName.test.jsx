import { render, screen } from "@testing-library/react";
import ProfileUserName from "../../src/components/ProfileUserName";

describe("ProfileUserName", () => {
    test("displays username in the component", () => {
      const username = "testUser";
      render(<ProfileUserName username={username} />);

      const usernameEl = screen.getByTestId("profile-username-heading");
      expect(usernameEl.textContent).toBe("testUser");
    });
});