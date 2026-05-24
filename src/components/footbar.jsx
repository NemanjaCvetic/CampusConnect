import "./footer.css";

 function Footbar() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-logo">
            <a href="https://www.upr.si" target="_blank" rel="noopener noreferrer">
          <img
            src="https://www.famnit.upr.si/resources/images/famnitlogosquare.png"
            alt="University Logo"
          />
          </a>
        </div>

        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/lostfound">Lost & Found</a>
          <a href="/login">Login</a>
          <a href="/signup">Sign Up</a>
        </div>

        <div className="footer-copy">
          <p>© {new Date().getFullYear()} CampusConnect</p>
          <p>All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}

export default Footbar;