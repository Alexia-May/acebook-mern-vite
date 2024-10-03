//import { useState, useEffect } from "react";
//import { useNavigate } from "react-router-dom";
//import { getFriends } from "../../services/friends";
//import Friend from "../../components/Friend";
import NavBar from "../../components/NavBar";

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
    
    return (
        <div className="home">
        <NavBar></NavBar>
        <h1>Check out your Friends!</h1>
        </div>
    );
}

