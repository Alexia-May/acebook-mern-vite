// importing the logout componant
import LogoutButton from "./LogoutButton";

// importing the nav bar css
//import "./NavBar.css"

import { 
    Nav, 
    HomeLogo, 
    LogoContainer, 
    Menu 
} from './styles/NavBar.styled.js';

function NavBar() {
    return (
        <Nav>
            <HomeLogo>
                <a href="/feed">
                    <LogoContainer>🍉</LogoContainer>
                </a>
            </HomeLogo>
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