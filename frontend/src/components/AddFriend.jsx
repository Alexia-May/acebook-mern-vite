import { addFriend } from "../services/friends"

export function AddFriend(props) {
  const handleClick = async (event) => {
    event.preventDefault()
    const token = localStorage.getItem("token"); // getting the token from browser storage

    const loggedIn = token !== null;
    if (loggedIn) {
      try {
        const data = await addFriend(token, props.userId);
        localStorage.setItem("token", data.token);
      } catch (err) {
        console.log(err);
      }
    }
  }
  return (
    <>
    <button onClick={handleClick}>Add Friend</button>
    </>
  )
}