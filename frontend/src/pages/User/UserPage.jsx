import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPosts } from "../../services/posts";
import { getUserInfo } from "../../services/user";
import NavBar from "../../components/NavBar";
import ListOfPosts from "../../components/ListOfPosts";
import UserInfo from "../../components/UserInfo"
import Username from "../../components/UserName"
import { AddFriend } from "../../components/AddFriend";
import { getFriends } from "../../services/friends";
import Melon from "../../components/Melon";

export function UserPage() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({ username: '', firstName: '', lastName: '' });
  const [friends, setFriends] = useState([]);
  const [isFriend, setIsFriend] = useState(false);
  const navigate = useNavigate();
  const { userId } = useParams();
  
  // function to get users posts
    useEffect(() => {
      const token = localStorage.getItem("token");
      const loggedIn = token !== null;
      if (loggedIn) {
        getPosts(token, userId)
          .then((data) => {
            setPosts(data.posts);
            localStorage.setItem("token", data.token);
          })
          .catch((err) => {
            console.error(err);
            navigate("/login");
          });
      }
    }, [navigate, userId]);
  
  // function to get user information
    useEffect(() => {
      const token = localStorage.getItem("token");
      const loggedIn = token !== null;
      if (loggedIn) {
        getUserInfo(token, userId)
          .then((data) => {
            setUser({
              username: data.userInfo[0].username,
              firstName: data.userInfo[0].firstName,
              lastName: data.userInfo[0].lastName,
              birthday: data.userInfo[0].birthday,
          });
            // console.log(data.userInfo[0])
            localStorage.setItem("token", data.token);
          })
          .catch((err) => {
            console.error(err);
            // navigate("/login");
          });
      }
    }, [navigate, userId]);
 

  useEffect(() => {
    const token = localStorage.getItem("token");
    const loggedIn = token !== null;
    if (loggedIn) {
      getFriends(token)
        .then((data) => {
          setFriends(data.friends);
          localStorage.setItem("token", data.token);
        })
        .catch((err) => {
          console.error(err);
          navigate("/login");
        });
    }
  }, [navigate]);
  console.log("friends", friends)
  useEffect(() => {
    if (friends) {
      const hasId = friends.some((friend) => friend._id === user._id);
      setIsFriend(hasId);
    }
  }, [user, friends]);

  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
    return;
  }
  return (
    <>
      <Melon></Melon>
      <br/>
      <NavBar />
      <Username
            username={user.username} 
            />
      <UserInfo
            firstName={user.firstName} 
            lastName={user.lastName}
            birthday={user.birthday}
            />
      <br/>
       {!isFriend && <AddFriend userId={userId} />}
      <h2>Posts</h2>
      <ListOfPosts posts={posts} />
    </>
  );
}
