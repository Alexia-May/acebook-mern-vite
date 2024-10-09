import NavBar from "../../components/NavBar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getConversations } from "../../services/conversations";
import Conversation from "../../components/Conversation";
import Melon from "../../components/Melon";

export function MessagesPage() {

  const [conversations, setConversations] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const navigate= useNavigate()

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   const loggedIn = token !== null;
  //   if (loggedIn) {
  //     getConversations(token)
  //       .then((data) => {
  //         setConversations(data.conversations);
  //         localStorage.setItem("token", data.token);
  //         setIsLoading(true)
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //         navigate("/login");
  //       });
  //   }
  // }, [navigate]);

  // const token = localStorage.getItem("token");
  // if (!token) {
  //   navigate("/login");
  //   return;
  // }

  
  console.log("conversations", conversations)
    return (
        <div className="home">
            <Melon></Melon>
            <br/>
            <NavBar></NavBar>
            <h1>Messages</h1>
            {/* {isLoading && conversations.map((conversation) => (<Conversation
              key={conversation._id}
              _id={conversation._id}
              title={conversation.participants[1].username}
              sender={conversation.participants[0].username}
              message={conversation.lastMessage.message}
              date={conversation.updatedAt}
            />))} */}
        </div>
    );
}