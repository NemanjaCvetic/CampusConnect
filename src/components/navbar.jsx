import "./navbar.css";
import logoImg from "../assets/www.famnit.upr.png";
function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2 className="logo">CampusConnect</h2>
        <img className ="logoImg" src={logoImg}></img>
      </div>

      <div className="navbar-center">
        <a href="#">Home</a>
        <a href="#">Lost & Found</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </div>

      <div className="navbar-right">
        <button className="login-btn">Login</button>
        <button className="signup-btn">Sign Up</button>
      </div>
    </nav>
  );
}

export default Navbar;