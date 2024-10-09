import { Link } from "react-router-dom";
import Melon from "../../components/Melon";

import "./HomePage.css";

export function HomePage() {
  return (
    <div className="home">
          <Melon></Melon>
    <br/>
      <h1>Welcome to Acebook!</h1>
      <Link to="/signup">Sign Up</Link>
      <Link to="/login">Log In</Link>
    </div>
  );
}
