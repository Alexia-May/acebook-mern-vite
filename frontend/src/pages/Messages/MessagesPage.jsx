import NavBar from "../../components/NavBar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getConversations } from "../../services/conversations";
import Conversation from "../../components/Conversation";
import { getFriends } from "../../services/friends";
import User from "../../components/User";
import { Button } from "../../components/Button";
import { handleCreateConversationClick } from "../../handlers/conversations";
export function MessagesPage() {
  const [conversations, setConversations] = useState([]);
  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const loggedIn = token !== null;
    if (loggedIn) {
      getConversations(token)
        .then((data) => {
          setConversations(data.conversations);
          localStorage.setItem("token", data.token);
          setIsLoading(true);
        })
        .catch((err) => {
          console.error(err);
          navigate("/login");
        });
    }
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const loggedIn = token !== null;
    if (loggedIn) {
      getFriends(token)
        .then((data) => {
          setFriends(data.friends);
          localStorage.setItem("token", data.token);
          setIsLoading(true);
        })
        .catch((err) => {
          console.error(err);
          navigate("/login");
        });
    }
  }, [navigate]);

  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
    return;
  }
  console.log("friends", friends);

  console.log("conversations", conversations);
  return (
    <div className="home">
      <NavBar></NavBar>
      <h1>Messages</h1>
      {isLoading &&
        conversations.map((conversation) => (
          <Conversation
            key={conversation._id}
            _id={conversation._id}
            title={conversation.participants[1].username}
            sender={conversation.participants[0].username}
            message={conversation.lastMessage?.message}
            date={conversation.updatedAt}
          />
        ))}
      {isLoading &&
        friends.map((friend) => (
          <>
            <User
              key={friend._id}
              _id={friend._id}
              username={friend.username}
            />
            <Button
              handleClick={() =>
                handleCreateConversationClick(update, setUpdate, {
                  participants: [friend._id],
                  updatedAt: new Date()
                })
              }
              buttonText={"Message"}
            />
          </>
        ))}
    </div>
  );
}
