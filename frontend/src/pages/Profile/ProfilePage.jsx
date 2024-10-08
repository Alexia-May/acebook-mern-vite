import NavBar from "../../components/NavBar";
import CreatePost from "../../components/CreatePost";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPosts } from "../../services/posts";
import { getUserInfo } from "../../services/user";
import ListOfPosts from "../../components/ListOfPosts";


export function ProfilePage() {
  const [posts, setPosts] = useState([]);
  const [createPostState, setCreatePostState] = useState(false);
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const loggedIn = token !== null;
      if (loggedIn) {
        try {
          const userData = await getUserInfo(token);
          setUser(userData.userInfo[0]);
          localStorage.setItem("token", userData.token);

          const postData = await getPosts(token, userData.userInfo[0]._id);
          setPosts(postData.posts);
          localStorage.setItem("token", postData.token);
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
      <NavBar></NavBar>
      <h1 data-testid="profilePage-h1">Welcome to your profile!</h1>
      <CreatePost
        setPosts={setPosts}
        setCreatePostState={setCreatePostState}
        createPostState={createPostState}
      ></CreatePost>
      <h2>Posts</h2>
        <ListOfPosts posts={posts} setPosts={setPosts}/>         

    </>
  );
}
