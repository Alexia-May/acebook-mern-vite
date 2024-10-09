import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import User from "../../components/User";
import { getFriends, getNonFriendUsers, getFriendRequests } from "../../services/friends";
import Friend from "../../components/Friend";
import { AcceptFriendRequest } from "../../components/AcceptFriendRequest";
import Melon from "../../components/Melon";


export function FriendsPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [request, setRequest] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const loggedIn = token !== null;
      try {
        if (loggedIn) {
          const friendRequestsData = await getFriendRequests(token)
          setFriendRequests(friendRequestsData.friendRequests)
          const usersData = await getNonFriendUsers(token)
          setUsers(usersData.users)
          const friendsData = await getFriends(token)
          setFriends(friendsData.friends)
          localStorage.setItem("token", friendsData.token);
        }
      } catch (err) {

        console.error(err);
        navigate("/login");
      }
    };
    fetchData();
  }, [navigate, request]);

  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
    return;
  }
  console.log("friend requests", friendRequests)

  return (
    
    <div className="home">
          <Melon></Melon>
    <br/>
      <NavBar></NavBar>

      <h1>Check out your Friends!</h1>
      {friendRequests.length === undefined && <p>Your freind requests</p>}
      {friendRequests.map((friend) => (
        <>
        <Friend key={friend._id} _id={friend._id} username={friend.username} />
        <AcceptFriendRequest key={friend._id +"1"} userId={friend._id} setRequest={setRequest}/>
        </>
      ))}
      <p>Your Friends</p>
      {friends.map((friend) => (
        <Friend key={friend._id} _id={friend._id} username={friend.username} />
      ))}
      <p>All Users</p>
      {users.map((user) => (
        <User key={user._id} user={user} />
      ))}
    </div>
  );
}
