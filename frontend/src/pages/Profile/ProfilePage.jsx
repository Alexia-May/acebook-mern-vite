import NavBar from "../../components/NavBar";
import CreatePost from "../../components/CreatePost";
import ProfileUserName from "../../components/ProfileUserName";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPosts } from "../../services/posts";
import { getUserInfo } from "../../services/user";
import ListOfPosts from "../../components/ListOfPosts";
import Melon from "../../components/Melon";


export function ProfilePage() {
  const [posts, setPosts] = useState([]);
  const [createPostState, setCreatePostState] = useState(false);
  const [user, setUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const loggedIn = token !== null;
      if (loggedIn) {
        try {
          const userData = await getUserInfo(token);
          setUser(userData.userInfo[0]);
          // console.log(userData.userInfo[0])
          // localStorage.setItem("token", userData.token);

          const postData = await getPosts(token, userData.userInfo[0]._id);
          setPosts(postData.posts);
          // localStorage.setItem("token", postData.token);
        } catch (err) {
          console.log(err);
          navigate("/login");
        }
      }
    };
    fetchData();
  }, [navigate, createPostState]);

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
      <ProfileUserName 
        username={user.username}
        />
      <br/>  
      <CreatePost
        setPosts={setPosts}
        setCreatePostState={setCreatePostState}
        createPostState={createPostState}
        />
      <br/>  
      <h2>Posts</h2>
        <ListOfPosts 
        posts={posts}
        />         
    </>
  );
}
