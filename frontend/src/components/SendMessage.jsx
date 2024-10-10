
import { useState } from "react";
import { sendMessage } from "../services/messages";
import { useNavigate } from "react-router-dom";
function SendMessage(props) {
  const [input, setInput] = useState("");
  const navigate = useNavigate()

  const handleChange = (event) => {
    setInput(event.target.value); // we can set the input by typing in the form
  };
  const handleSubmit = async (event) => {
    event.preventDefault(); // prevents the default (changing page)
    const token = localStorage.getItem("token"); // getting the token from browser storage
    const message = {
      // creates the post object
      message: input,
      sentAt: new Date(),
    };

    const loggedIn = token !== null;
    if (loggedIn) {
      try {
        await sendMessage(token, props.conversationId, message);
        setInput(""); // will reset the text field after the message has been submited
        props.setMessageState(!props.isMessageState);
      } catch (err) {
        console.log(err);
        navigate("/login")
      }
    }
  };
  return (
        <form onSubmit={handleSubmit}>
          <textarea
            data-testid="messageForm"
            onChange={handleChange}
            maxLength="500"
            title="MessageBox"
            value={input}
          />
          <button>Send</button>
        </form>
  );
}

export default SendMessage;
