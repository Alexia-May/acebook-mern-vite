import { render, screen } from "@testing-library/react";
import { MessagesPage } from "../../src/pages/Messages/MessagesPage";
import { MemoryRouter } from "react-router-dom";

describe("Messages Page", () => {
    beforeEach(() => {
    // Clear local storage before each test if authentication/token is necessary
    window.localStorage.removeItem("token");
    });

    test("It displays a page heading", async () => {
    // Render the component
    render(
    <MemoryRouter>
        <MessagesPage />
    </MemoryRouter>
    );

    // Look for an <h1> element
    const heading = await screen.findByRole("heading", { level: 1 });

    // Assert that the text content of the heading is 'Messages'
    expect(heading.textContent).toEqual("Messages");
    });
});
