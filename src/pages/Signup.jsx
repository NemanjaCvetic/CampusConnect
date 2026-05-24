import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth.js";
import toast from "react-hot-toast";
import "./Signup.css"


function Signup({ setLogged }) {

  const [name, setName] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [termsError, setTermsError] = useState("")

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");


    if (!/^\d+$/.test(studentNumber)) {
      return setError("Student number must contain only digits");
    }

    if (!email.endsWith("@student.upr.si")) {
      return setEmailError("Only @student.upr.si emails are allowed");
    }

    if (password !== confirmPassword) {
      return setPasswordError("Passwords do not match");
    }

    if (password.length < 6) {
      return setPasswordError("Password must be at least 6 characters");
    }

    if (!agreed) {
      return setTermsError("You must agree to the Terms and Services");
    }

    setLoading(true);

    try {
      await registerUser(name, studentNumber, email, password);
      navigate("/login");
    } catch (err) {
     toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Sign Up</h1>

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
            required
          />

          {error && (
            <p style={{ color: "red", fontSize: "0.9rem" }}>{error}</p>
          )}

          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError("");
            }}
            required
          />

          {emailError && (
            <p style={{ color: "red", fontSize: "0.9rem" }}>{emailError}</p>
          )}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setPasswordError(""); }}
            required
          />

          {passwordError && (
            <p style={{ color: "red", fontSize: "0.9rem" }}>{passwordError}</p>
          )}

          <input
            type="password"
            placeholder="Repeat password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <div className="checkbox-group">
            <input
              type="checkbox"
              id="terms"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />

            <label htmlFor="terms">
              I agree to the Terms and Services
            </label>
          </div>

          {termsError && (
            <p style={{ color: "red", fontSize: "0.9rem" }}>{termsError}</p>
          )}

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