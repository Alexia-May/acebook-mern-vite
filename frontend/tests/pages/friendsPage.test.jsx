import { render, screen } from "@testing-library/react";
import { FriendsPage } from "../../src/pages/Friends/FriendsPage";
import { MemoryRouter } from "react-router-dom";


describe("Testing Friends Page", () => {
    beforeEach(() => {
        window.localStorage.removeItem("token");
    });

    test("It displays the heading", async () => {
        render(
        <MemoryRouter>
            <FriendsPage />
        </MemoryRouter>
        );

        const text = await screen.findByRole("heading", {level: 1});
        expect(text.textContent).toEqual("Check out your Friends!");
    });

});