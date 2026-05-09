import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth.js";
import "./Login.css"
function Login({ setLogged }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const data = await loginUser(email, password);

            // Save token and user info so the user stays logged in on refresh
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            setLogged(true);
            navigate("/");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    
    return (
  <div className="auth-page1">
    <div className="auth-card">
      <h1>Login</h1>

      {error && (
                    <p style={{ color: "red", fontSize: "0.9rem" }}>{error}</p>
                )}

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

        <button type="submit" disabled={loading}>
                        {loading ? "Logging in..." : "Log In"}
                    </button>
      </form>

      <p>
        Don’t have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  </div>
);

}

export default Login;