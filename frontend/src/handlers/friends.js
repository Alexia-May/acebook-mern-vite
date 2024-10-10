
import { addFriend, deleteFriend } from "../services/friends";

export async function handleDeleteFriendClick(navigateFunc, userId) {
  const token = localStorage.getItem("token"); // getting the token from browser storage
  const loggedIn = token !== null;
  if (loggedIn) {
    try {
      const data = await deleteFriend(token, userId);
      localStorage.setItem("token", data.token);
      navigateFunc("/friends")
    } catch (err) {
      console.log(err);
    }
  }
}
export async function handleAddFriendClick(navigateFunc, userId) {
  const token = localStorage.getItem("token"); // getting the token from browser storage
  const loggedIn = token !== null;
  if (loggedIn) {
    try {
      const data = await addFriend(token, userId);
      localStorage.setItem("token", data.token);
      navigateFunc("/friends")
    } catch (err) {
      console.log(err);
    }
  }
}
