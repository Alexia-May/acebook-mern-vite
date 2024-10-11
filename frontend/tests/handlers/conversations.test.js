import {  handleCreateConversationClick } from "../../src/handlers/conversations";
import { createConversation } from "../../src/services/conversations";
import { beforeEach, vi } from "vitest";

vi.mock("../../src/services/conversations", () => {
  const createConversationMock = vi.fn();
  return {
    createConversation: createConversationMock,
  }
})


describe("conversaton handlers", () => {
  beforeEach(async () => {
    vi.clearAllMocks()
    window.localStorage.removeItem("token");
    await createConversation.mockResolvedValue({
      message: "message",
      token: "newToken"

  })
})
  test("handle create conversation click",async () => {
    window.localStorage.setItem("token", "testToken");
    const conversation = {
      participants: ["1234"],
      updatedAt: new Date("2024-10-07"),
    }
    const updateFunc = vi.fn()
    const state = false
    await handleCreateConversationClick(state, updateFunc, conversation)

    expect(createConversation).toHaveBeenCalledWith("testToken", conversation)
    expect(updateFunc).toHaveBeenCalledWith(!state)
  })
})