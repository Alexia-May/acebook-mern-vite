
import { addLike, deleteLike  } from "../services/posts";


export async function handleAddLikeClick(state, updateState, postId) {
  const token = localStorage.getItem("token"); // getting the token from browser storage
  const loggedIn = token !== null;
  if (loggedIn) {
    try {
      const data = await addLike(token, postId);
      localStorage.setItem("token", data.token);
      updateState(!state)
    } catch (err) {
      console.log(err);
    }
  }
}
export async function handleDeleteLikeClick(state, updateState, postId) {
  const token = localStorage.getItem("token"); // getting the token from browser storage
  const loggedIn = token !== null;
  if (loggedIn) {
    try {
      const data = await deleteLike(token, postId);
      localStorage.setItem("token", data.token);
      updateState(!state)
    } catch (err) {
      console.log(err);
    }
  }
}

