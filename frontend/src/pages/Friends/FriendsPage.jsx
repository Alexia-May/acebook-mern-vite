//import { useState, useEffect } from "react";
//import { useNavigate } from "react-router-dom";
//import { getFriends } from "../../services/friends";
//import Friend from "../../components/Friend";
import NavBar from "../../components/NavBar";
import User from "../../components/User";

export function FriendsPage() {
/*  const [friends, setFriends] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const loggedIn = token !== null;
        if (loggedIn) {
        getFriends(token)
            .then((data) => {
            setFriends(data.friends);
            localStorage.setItem("token", data.token);
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
        
    } */

        //const created just for testing
    const friends = [
      {
        _id: "1234",
        username: "testuser1"
      },
      {
        _id: "1235",
        username: "testuser2"
      },
      {
        _id: "1236",
        username: "testuser3"
      },
    ]
    
    return (
        <div className="home">
            <NavBar></NavBar>
            
            <h1>Check out your Friends!</h1>
            <p>Temporary listing all users</p>
            <User user={friends[0]}></User>
        </div>
    );
}

