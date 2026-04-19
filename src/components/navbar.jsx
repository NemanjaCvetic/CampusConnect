import "./navbar.css";
import {useNavigate} from "react-router-dom"
import logoImg from "../assets/www.famnit.upr.png";
import { Link } from "react-router-dom";
function Navbar() {

  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2 className="logo">CampusConnect</h2>
        <img className ="logoImg" src={logoImg}></img>
      </div>

      <div className="navbar-center">
        <Link to="/">Home</Link>
        <a href="#">Lost & Found</a>
        <Link to="/about">About</Link>
        <a href="#">Contact</a>
      </div>

      <div className="navbar-right">
        <button onClick={() => navigate("/login")} className="login-btn">Login</button>
        <button onClick={() => navigate("/signup")} className="signup-btn">Sign Up</button>
      </div>
    </nav>
  );
}

export default Navbar;