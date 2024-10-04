// importing the logout componant
import { Component } from "react";
import LogoutButton from "./LogoutButton";

// importing the nav bar css
import "./NavBar.css"


function NavBar() {
    return (
        <nav>
            <div className="homeLogo">
                <a href="/feed">
                    <div className="logoContainer">
                        🍉
                    </div>
                    <div>
                        Home
                    </div>
                </a>
            </div>
            <div className="menu">
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


