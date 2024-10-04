import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ProfilePage } from "../../src/pages/Profile/ProfilePage";

describe("Profile Page", () => {
  beforeEach(() => {
    window.localStorage.removeItem("token");
  });

  test("It displays a page heading", async () => {
    window.localStorage.setItem("token", "testToken");
    render( // what is it??
      <MemoryRouter>
        <ProfilePage />
      </MemoryRouter>
    );

    const heading = await screen.findByTestId("profilePage-h1");
    console.log(heading)
    expect(heading.textContent).toEqual("Welcome to your profile!");
  });

});

