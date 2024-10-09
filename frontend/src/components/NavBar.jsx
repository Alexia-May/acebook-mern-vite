// importing the logout componant
import LogoutButton from "./LogoutButton";

// importing the nav bar css
import "./NavBar.css"


function NavBar() {
    return (
        <nav>
            <div className="menu">
                <a href="/feed">Home</a>
                <a href="/profile">Profile</a>
                <a href="/friends">Friends</a>
                <a href="/messages">Messages</a>
                <a href="/settings">Settings</a>
                <LogoutButton></LogoutButton>
            </div>
        </nav>
    )
}

export default NavBar;