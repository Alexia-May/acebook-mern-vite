import { addLike, deleteLike } from "../../src/services/posts";
import { handleAddLikeClick } from "../../src/handlers/posts";
import { handleDeleteLikeClick } from "../../src/handlers/posts";
import { beforeEach, vi } from "vitest";

vi.mock("../../src/services/posts", () => {
  const addLikeMock = vi.fn();
  const deleteLikeMock = vi.fn();
  return {
    addLike: addLikeMock,
    deleteLike: deleteLikeMock,
  }
})


describe("friend handlers", () => {
  beforeEach(async () => {
    vi.clearAllMocks()
    window.localStorage.removeItem("token");
    await addLike.mockResolvedValue({
      message: "message",
      token: "newToken"
    })
    await deleteLike.mockResolvedValue({
      message: "message",
      token: "newToken"
    })

  })
  test("handle add like click",async () => {
    window.localStorage.setItem("token", "testToken");
    const postId = 123
    const state = false
    const updateFunc = vi.fn()
    await handleAddLikeClick(state,updateFunc, postId)
    
    expect(addLike).toHaveBeenCalledWith("testToken", postId)
    expect(updateFunc).toHaveBeenCalledWith(!state)
  })
  test("handle delete like click",async () => {
    window.localStorage.setItem("token", "testToken");
    const postId = 123
    const state = false
    const updateFunc = vi.fn()
    await handleDeleteLikeClick(state,updateFunc, postId)

    expect(deleteLike).toHaveBeenCalledWith("testToken", postId)
    expect(updateFunc).toHaveBeenCalledWith(!state)
  })


})