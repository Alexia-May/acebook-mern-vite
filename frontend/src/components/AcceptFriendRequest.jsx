import { acceptFriendRequest } from "../services/friends";
import { declineFriendRequest } from "../services/friends";

export function FriendRequest(props) {
  const handleAcceptClick = async (event) => {
    event.preventDefault()
    const token = localStorage.getItem("token"); // getting the token from browser storage

    const loggedIn = token !== null;
    if (loggedIn) {
      try {
        const data = await acceptFriendRequest(token, props.userId);
        localStorage.setItem("token", data.token);
        props.setRequest("")
      } catch (err) {
        console.log(err);
      }
    }
  }
  const handleDeclineClick = async (event) => {
    event.preventDefault()
    const token = localStorage.getItem("token"); // getting the token from browser storage

    const loggedIn = token !== null;
    if (loggedIn) {
      try {
        const data = await declineFriendRequest(token, props.userId);
        localStorage.setItem("token", data.token);
        props.setRequest("")
      } catch (err) {
        console.log(err);
      }
    }
  }
  return (
    <>
    <button onClick={handleAcceptClick}>Accept</button>
    <button onClick={handleDeclineClick}>Decline</button>
    </>
  )
}