// importing the logout componant
import LogoutButton from "./LogoutButton";
import NavUserName from "./NavUserName";
import { useState, useEffect } from "react";
import { getUserInfo } from "../services/user";
import { useNavigate } from "react-router-dom";

// importing the nav bar css
//import "./NavBar.css"
import { 
    Nav, 
    HomeLogo, 
    LogoContainer, 
    Menu, 
} from './styles/NavBar.styled.js';

function NavBar() {

const [user, setUser] = useState('');
const navigate = useNavigate();

useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const loggedIn = token !== null;
      if (loggedIn) {
        try {
          const userData = await getUserInfo(token);
          setUser(userData.userInfo[0]);
        console.log(userData.userInfo[0].username)

        } catch (err) {
          console.log(err);
          navigate("/login");
        }
      }
    };
    fetchData();
  }, [navigate]);

    return (
        <Nav>
            <HomeLogo>
                <a href="/feed">
                    <LogoContainer>🍉</LogoContainer>
                </a>
            </HomeLogo>
            <NavUserName
            // username={user.username}
            firstName={user.firstName}
            lastName={user.lastName}
            />
            <Menu>
                <a href="/profile">Profile</a>
                <a href="/friends">Friends</a>
                <a href="/messages">Messages</a>
                <a href="/settings">Settings</a>
                <LogoutButton />
            </Menu>
        </Nav>
    );
}

export default NavBar;