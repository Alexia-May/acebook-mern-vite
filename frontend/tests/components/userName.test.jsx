import { render, screen } from "@testing-library/react";

import UserName from "../../src/components/UserName";

describe("Username", () => {
    test("displays username in the component", () => {
      const username = "testUser";
      render(<UserName username={username} />);

      const usernameEl = screen.getByTestId("username-heading");
      expect(usernameEl.textContent).toBe("testUser's Profile");
    });
});