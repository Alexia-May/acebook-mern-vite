import NavBar from "../../components/NavBar";
import CreatePost from "../../components/CreatePost";
import ProfileUserName from "../../components/ProfileUserName";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPosts } from "../../services/posts";
import { getUserInfo } from "../../services/user";
import ListOfPosts from "../../components/ListOfPosts";


export function ProfilePage() {
  const [posts, setPosts] = useState([]);
  const [createPostState, setCreatePostState] = useState(false);
  const [user, setUser] = useState('');
  const [deleted, setDelete] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const loggedIn = token !== null;
      if (loggedIn) {
        try {
          const userData = await getUserInfo(token);
          setUser(userData.userInfo[0]);

          const postData = await getPosts(token, userData.userInfo[0]._id);
          setPosts(postData.posts);

        } catch (err) {
          console.log(err);
          navigate("/login");
        }
      }
    };
    fetchData();
  }, [navigate, createPostState]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const loggedIn = token !== null;
    if (loggedIn && user._id) { // Ensure user._id exists
      getPosts(token, user._id) // Fetch posts for this specific user
        .then((data) => {
          setPosts(data.posts); // Update posts for this user's profile
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [navigate, deleted, user._id]);

  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
    return;
  }
  return (
    <>
      <NavBar></NavBar>
      <>
      </>
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
      userId={user._id} 
      setDelete={setDelete}/>         
    </>
  );
}
