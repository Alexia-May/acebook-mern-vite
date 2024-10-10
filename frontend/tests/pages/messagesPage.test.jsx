import { render, screen } from "@testing-library/react";
import { MessagesPage } from "../../src/pages/Messages/MessagesPage";
import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import { vi } from "vitest";
import { getConversations } from "../../src/services/conversations";

vi.mock("../../src/services/conversations", () => {
  const getConversationsMock = vi.fn();
  return { getConversations: getConversationsMock };
});
describe("Messages Page", () => {
  beforeEach(() => {
    // Clear local storage before each test if authentication/token is necessary
    window.localStorage.removeItem("token");
  });

  test.("It displays a page heading", async () => {
    getConversations.mockResolvedValue({
      conversations: [],
      token: "newToken",
    });
    // Render the component
    await act(async () => {
      render(
        <MemoryRouter>
          <MessagesPage />
        </MemoryRouter>
      );
    });

    // Look for an <h1> element
    screen.debug;
    const heading = await screen.findByRole("heading");

    // Assert that the text content of the heading is 'Messages'
    expect(heading.textContent).toEqual("Messages");
  });
});
