import "./navbar.css";
import { useNavigate } from "react-router-dom"
import logoImg from "../assets/www.famnit.upr.png";
import { Link } from "react-router-dom";
function Navbar({ isLogged, onLogout }) {

  const navigate = useNavigate();

  function handleLogout() {
    onLogout();
    navigate("/");
  }

  const user = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2 className="logo">CampusConnect</h2>
        <img className="logoImg" src={logoImg}></img>
      </div>

      <div className="navbar-center">
        <Link to="/">Home</Link>
        <Link to="/lostfound">Lost & Found</Link>
        <Link to="/about">About</Link>
        <Link to="/manual">Manual</Link>
        {user?.role === "student" && (<Link to="/profile">Profile</Link>)}
        {user?.role === "admin" && (
          <Link to="/admin">Admin Dashboard</Link>
        )}
      </div>

      <div className="navbar-right">
        {isLogged ? (
          <>
            <span style={{ fontSize: "15px", color: "var(--text-light)" }}>
              Hi, {user?.name}
            </span>
            <button onClick={handleLogout} className="login-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <button onClick={() => navigate("/login")} className="login-btn">
              Login
            </button>
            <button onClick={() => navigate("/signup")} className="signup-btn">
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;