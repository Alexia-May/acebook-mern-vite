import "./CreatePost.css";
import { useEffect, useState, useRef } from "react";
import { createPost } from "../services/posts";
import { getPosts } from "../services/posts";
import { getRandomAvatar } from "../handlers/avatarUtils.js"
import {
  CreateContainer,
  Avatar,
  InputContainer,
  Textarea,
  SubmitButton
} from "./styles/CreatePost.styled.js";

function CreatePost(props) {
  
  const [input, setInput] = useState("");
  const [avatar, setAvatar] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    setAvatar(getRandomAvatar()); 
  }, []);

  const handleChange = (event) => {
    setInput(event.target.value); 
    autoResizeTextarea();
  };

  const autoResizeTextarea = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto"; 
    textarea.style.height = `${textarea.scrollHeight}px`; 
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    const token = localStorage.getItem("token"); 
    const post = {
      message: input,
      dateCreated: new Date(),
    };

    const loggedIn = token !== null;
    if (loggedIn) {
      try {
        await createPost(token, post);
        setInput(""); 
        const postData = await getPosts(token)
        localStorage.setItem("token", postData.token);
        props.setPosts(postData.posts);

        props.setCreatePostState(!props.createPostState);
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <CreateContainer>
      <Avatar src={avatar} alt="User Avatar" />
      <InputContainer>
        <form onSubmit={handleSubmit}>
          <Textarea
            ref={textareaRef}
            placeholder="Share what is on your mind..."
            value={input}
            onChange={handleChange}
            data-testid="messageForm"
            maxLength="500"
          />
          <SubmitButton type="submit">
            <img
              src="src/assets/sendPost.svg"
              alt="Send Post Image"
            />
          </SubmitButton>
        </form>
      </InputContainer>
    </CreateContainer>
  );
}

export default CreatePost;
