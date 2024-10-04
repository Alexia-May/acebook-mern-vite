import "./CreatePost.css";
import { useState } from "react";
import { createPost } from "../services/posts";
function CreatePost() {
  const [wordCount, setWordCount] = useState(0);
  const [input, setInput] = useState("");

  const handleWordCount = (event) => { // stores the form text as 'input' variable
    setInput(event.target.value); // we can set the input by typing in the form
  //code for charac limit below
    // const length = input.split("").length;
    // if (length <= 500) {
    //   setWordCount(length);
    // }
  };
  const handleSubmit = async (event) => {
    event.preventDefault(); // prevents the default (changing page)
    const token = localStorage.getItem("token"); // getting the token from browser storage
    const post = { // creates the post object
      message: input,
      dateCreated: new Date(),
    };
    console.log("postObject", post); // to check in the console that the message was sent
    try {
      const data = await createPost(token, post);
      localStorage.setItem("token", data.token);
      setInput("")// will reset the text field after the message has been submited
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="CreateContainer">
      <h3>Create a Post</h3>
      <div className="FieldContainer">
        <form onSubmit={handleSubmit}>
            <textarea
              data-testid="messageForm"
              onChange={handleWordCount}
              maxLength="500"
              title="MessageBox"
              value={input}
              />
          <p className="WordCounter">{`${wordCount}/500`}</p>
          <button className="SubmitButton">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
