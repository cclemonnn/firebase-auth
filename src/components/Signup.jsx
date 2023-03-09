import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Form.css";

function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signUp } = useAuth();

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    // Check passwords matches confirm password
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signUp(emailRef.current.value, passwordRef.current.value);

      navigate("/");
    } catch {
      setError("Failed to create an account");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      {error !== "" && <div className="alert">{error}</div>}
      <h1 className="title">Sign Up</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="inputContainer">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" ref={emailRef} required />
        </div>

        <div className="inputContainer">
          <label htmlFor="password">Password (6 characters min):</label>
          <input
            type="password"
            id="password"
            name="password"
            ref={passwordRef}
            required
          />
        </div>

        <div className="inputContainer">
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            ref={passwordConfirmRef}
            required
          />
        </div>

        <button type="submit" disabled={loading} className="btn">
          Sign Up
        </button>
      </form>

      <div className="alreadyText">
        Already have an account?{" "}
        <Link to="/login" className="link">
          Log In
        </Link>{" "}
      </div>
    </div>
  );
}

export default Signup;
