import { cancelFriendRequest } from "../services/friends";

export function CancelFriendRequest(props) {
  const handleCancelClick = async (event) => {
    event.preventDefault()
    const token = localStorage.getItem("token"); // getting the token from browser storage

    const loggedIn = token !== null;
    if (loggedIn) {
      try {
        const data = await cancelFriendRequest(token, props.userId);
        localStorage.setItem("token", data.token);
        props.setRequest("")
      } catch (err) {
        console.log(err);
      }
    }
  }
  return (
    <>
    <button onClick={handleCancelClick}>Cancel</button>
    </>
  )
}