import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import User from "../../components/User";
import {
  getFriends,
  getNonFriendUsers,
  getFriendRequests,
  getPendingFriendRequests,
} from "../../services/friends";
import Friend from "../../components/Friend";
import { FriendRequest } from "../../components/AcceptFriendRequest";
import { CancelFriendRequest } from "../../components/CancelFriendRequest";
import { Button } from "../../components/Button"
import { handleDeclineClick, handleAcceptClick } from "../../handlers/friendRequests";

export function FriendsPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [request, setRequest] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [pendingFriendRequests, setPendingFriendRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const loggedIn = token !== null;
      try {
        if (loggedIn) {
          const pendingFriendRequestsData = await getPendingFriendRequests(token);
          setPendingFriendRequests(pendingFriendRequestsData.pendingRequests);
          const friendRequestsData = await getFriendRequests(token);
          setFriendRequests(friendRequestsData.friendRequests);
          const usersData = await getNonFriendUsers(token);
          setUsers(usersData.users);
          const friendsData = await getFriends(token);
          setFriends(friendsData.friends);
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

  return (
    <div className="home">
      <NavBar></NavBar>

      <h1>Check out your Friends!</h1>
      {friendRequests.length === undefined && <p>Your friend requests</p>}
      {friendRequests.map((friend) => (
        <>
          <Friend
            key={friend._id}
            _id={friend._id}
            username={friend.username}
          />
          <Button handleClick={() => handleDeclineClick(setRequest, friend._id)} buttonText={"Decline"}/>
          <Button handleClick={() => handleAcceptClick(setRequest, friend._id)} buttonText={"Accept"}/>
        </>
      ))}
      <p>Your Friends</p>
      {friends.map((friend) => (
        <Friend key={friend._id} _id={friend._id} username={friend.username} />
      ))}
      <p>All Users</p>
      {users.map((user) => (
        <User key={user._id} _id={user._id} username={user.username} />
      ))}
      <p>Your pending friend requests</p>
      {pendingFriendRequests.map((friend) => (
        <>
          <Friend
            key={friend._id}
            _id={friend._id}
            username={friend.username}
          />
          <CancelFriendRequest
            key={friend._id + "1"}
            userId={friend._id}
            setRequest={setRequest}
          />
        </>
      ))}
    </div>
  );
}
