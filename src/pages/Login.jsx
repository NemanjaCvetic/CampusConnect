import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css"
function Login({ setLogged }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        setLogged(true);
    }

    
    return (
  <div className="auth-page">
    <div className="auth-card">
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Log In</button>
      </form>

      <p>
        Don’t have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  </div>
);

}

export default Login;