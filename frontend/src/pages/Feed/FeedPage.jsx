import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPosts } from "../../services/posts";
import { getUserInfo } from "../../services/user";
import NavBar from "../../components/NavBar";
import ListOfPosts from "../../components/ListOfPosts";
import Melon from "../../components/Melon";

export function FeedPage() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState([]);
  const [deleted, setDelete] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const loggedIn = token !== null;
    if (loggedIn) {
      getPosts(token)
        .then((data) => {
          setPosts(data.posts);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [navigate, deleted]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const loggedIn = token !== null;
    if (loggedIn) {
      getUserInfo(token)
        .then((data) => {
          setUser(data.userInfo[0]);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [navigate]);

  

  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
    return;
  }

  return (
    <>
    <Melon></Melon>
    <br/>
    <NavBar></NavBar>
      <h2>Posts</h2>
      <ListOfPosts posts={posts} userId={user._id} setDelete={setDelete}/>         
    </>
  );
}
