import { acceptFriendRequest, declineFriendRequest } from "../services/friends";

export async function handleAcceptClick(setStateFunc, userId) {
  const token = localStorage.getItem("token"); // getting the token from browser storage

  const loggedIn = token !== null;
  if (loggedIn) {
    try {
      const data = await acceptFriendRequest(token, userId);
      localStorage.setItem("token", data.token);
      setStateFunc("")
    } catch (err) {
      console.log(err);
    }
  }
}
export async function handleDeclineClick (setStateFunc, userId) {
  const token = localStorage.getItem("token"); // getting the token from browser storage

  const loggedIn = token !== null;
  if (loggedIn) {
    try {
      const data = await declineFriendRequest(token, userId);
      localStorage.setItem("token", data.token);
      setStateFunc("")
    } catch (err) {
      console.log(err);
    }
  }
}