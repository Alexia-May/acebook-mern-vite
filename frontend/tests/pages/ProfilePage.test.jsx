import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ProfilePage } from "../../src/pages/Profile/ProfilePage";

describe("Profile Page", () => {
  beforeEach(() => {
    window.localStorage.removeItem("token");
  });

  test("It displays a page heading", async () => {

    render(
      <MemoryRouter>
        <ProfilePage />
      </MemoryRouter>
    );

    const heading = await screen.findByRole("heading", {level: 1});
    expect(heading.textContent).toEqual("Welcome to your profile!");
  });

});

