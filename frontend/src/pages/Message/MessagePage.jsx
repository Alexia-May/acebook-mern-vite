import NavBar from "../../components/NavBar";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMessages } from "../../services/messages";
import Message from "../../components/Message";
import Melon from "../../components/Melon";


export function MessagePage() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate();
  const { conversationId } = useParams();
  console.log("convid", conversationId)

  useEffect(() => {
    const token = localStorage.getItem("token");
    const loggedIn = token !== null;
    if (loggedIn) {
      getMessages(token, conversationId)
        .then((data) => {
          setMessages(data.messages);
          localStorage.setItem("token", data.token);
          setIsLoading(true)
        })
        .catch((err) => {
          console.error(err);
          navigate("/login");
        });
    }
  }, [navigate, conversationId]);
  console.log("messages", messages)
    return (
        <div className="home">
            <Melon></Melon>
            <br/>
            <NavBar></NavBar>
            <h1>Message</h1>
            {isLoading && messages.map((message) => (
              <Message
                key={message._id}
                message={message.message}
                sender={message.senderId.username}
              />
            ))}
        </div>
    );
}