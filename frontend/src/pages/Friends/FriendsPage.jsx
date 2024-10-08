import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import User from "../../components/User";
import { getAllUsers } from "../../services/users";

export function FriendsPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const loggedIn = token !== null;
    if (loggedIn) {
      getAllUsers(token)
        .then((data) => {
          setUsers(data.users);
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
    return;
  }
  

  return (
    <div className="home">
      <NavBar></NavBar>

      <h1>Check out your Friends!</h1>
      <p>Temporary listing all users</p>
      {users.map((user) => (
        <User key={user._id} user={user} />
      ))}
    </div>
  );
}
