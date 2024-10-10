import { acceptFriendRequest, declineFriendRequest } from "../../src/services/friends";
import { handleAcceptClick, handleDeclineClick } from "../../src/handlers/friendRequests";

import { beforeEach, vi } from "vitest";

vi.mock("../../src/services/friends", () => {
  const acceptFriendRequestMock = vi.fn();
  const declineFriendRequestMock = vi.fn();
  return {
    acceptFriendRequest: acceptFriendRequestMock,
    declineFriendRequest: declineFriendRequestMock
  }
})

describe("friend request handlers", () => {
  beforeEach(async () => {
    vi.clearAllMocks()
    window.localStorage.removeItem("token");
    await acceptFriendRequest.mockResolvedValue({
      message: "message",
      token: "newToken"
    })
    await declineFriendRequest.mockResolvedValue({
      message: "message",
      token: "newToken"
    })
  })
  test("handle accept click",async () => {
    window.localStorage.setItem("token", "testToken");
    const userId = 123
    const func = vi.fn()
    await handleAcceptClick(func, userId)

    expect(acceptFriendRequest).toHaveBeenCalledWith("testToken", userId)
    expect(func).toHaveBeenCalledWith("")
  })
  test("handle decline click",async () => {
    window.localStorage.setItem("token", "testToken");
    const userId = 123
    const func = vi.fn()
    await handleDeclineClick(func, userId)

    expect(declineFriendRequest).toHaveBeenCalledWith("testToken", userId)
    expect(func).toHaveBeenCalledWith("")
  })
})