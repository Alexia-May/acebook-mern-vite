import { deleteFriend, addFriend } from "../../src/services/friends";
import { handleAddFriendClick, handleDeleteFriendClick } from "../../src/handlers/friends";

import { beforeEach, vi } from "vitest";

vi.mock("../../src/services/friends", () => {
  const deleteFriendMock = vi.fn();
  const addFriendMock = vi.fn()
  return {
    deleteFriend: deleteFriendMock,
    addFriend: addFriendMock
  }
})


describe("friend handlers", () => {
  beforeEach(async () => {
    vi.clearAllMocks()
    window.localStorage.removeItem("token");
    await deleteFriend.mockResolvedValue({
      message: "message",
      token: "newToken"
    })
    await addFriend.mockResolvedValue({
      message: "message",
      token: "newToken"
    })

  })
  test("handle delete friend click",async () => {
    window.localStorage.setItem("token", "testToken");
    const userId = 123
    const navigateFunc = vi.fn()
    await handleDeleteFriendClick(navigateFunc, userId)

    expect(deleteFriend).toHaveBeenCalledWith("testToken", userId)
    expect(navigateFunc).toHaveBeenCalledWith("/friends")
  })
  test("handle add friend click",async () => {
    window.localStorage.setItem("token", "testToken");
    const userId = 123
    const navigateFunc = vi.fn()
    await handleAddFriendClick(navigateFunc, userId)

    expect(addFriend).toHaveBeenCalledWith("testToken", userId)
    expect(navigateFunc).toHaveBeenCalledWith("/friends")
  })

})