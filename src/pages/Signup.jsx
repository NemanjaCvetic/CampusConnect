import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth.js";
import "./Signup.css"
function Signup({ setLogged }) {

    const [name, setName] = useState("");
    const [studentNumber, setStudentNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        // Client-side validation before hitting the API
        if (password !== confirmPassword) {
            return setError("Passwords do not match");
        }

        if (!email.endsWith("@student.upr.si")) {
            return setError("Only @student.upr.si emails are allowed");
        }

        if (!/^\d+$/.test(studentNumber)) {
            return setError("Student number must contain only digits");
        }

        setLoading(true);

        try {
            await registerUser(name, studentNumber, email, password);
            // Registration successful — redirect to login
            navigate("/login");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    
    return (
  <div className="auth-page">
    <div className="auth-card">
      <h1>Sign Up</h1>
            {error && (
            <p style={{ color: "red", fontSize: "0.9rem" }}>{error}</p>
                )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Student number"
          value={studentNumber}
          onChange={(e) => setStudentNumber(e.target.value)}
          reqired
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Repeat password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
        {loading ? "Creating account..." : "Sign Up"}
        </button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  </div>
);

}

export default Signup;