import "./CreatePost.css";
import { useState } from "react";
import { createPost } from "../services/posts";
import { getPosts } from "../services/posts";
function CreatePost(props) {
  // const [wordCount, setWordCount] = useState(0);
  const [input, setInput] = useState("");

  const handleChange = (event) => {
    // stores the form text as 'input' variable
    setInput(event.target.value); // we can set the input by typing in the form
    // const length = input.split("").length;
    // if (length <= 500) {
    //   setWordCount(length);
    // }
  };
  const handleSubmit = async (event) => {
    event.preventDefault(); // prevents the default (changing page)
    const token = localStorage.getItem("token"); // getting the token from browser storage
    const post = {
      // creates the post object
      message: input,
      dateCreated: new Date(),
    };

    const loggedIn = token !== null;
    if (loggedIn) {
      try {
        await createPost(token, post);
        setInput(""); // will reset the text field after the message has been submited
        const postData = await getPosts(token)
        localStorage.setItem("token", postData.token);
        //   .then((data) => {

        props.setPosts(postData.posts);
        //     localStorage.setItem("token", data.token);
        //   })
        //   .catch((err) => {
        //     console.error(err);
        //     // navigate("/login");
        //   });

        props.setCreatePostState(!props.createPostState);
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className="CreateContainer">
      <h3>Create a Post</h3>
      <div className="FieldContainer">
        <form onSubmit={handleSubmit}>
          <textarea
            data-testid="messageForm"
            onChange={handleChange}
            maxLength="500"
            title="MessageBox"
            value={input}
          />
          {/* <p className="WordCounter">{`${wordCount}/500`}</p> */}
          <button className="SubmitButton">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
