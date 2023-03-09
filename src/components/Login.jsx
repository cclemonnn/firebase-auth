import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Form.css";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { logIn } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await logIn(emailRef.current.value, passwordRef.current.value);

      navigate("/");
    } catch {
      setError("Failed to sign in");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      {error !== "" && <div className="alert">{error}</div>}
      <h1 className="title">Log in</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="inputContainer">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" ref={emailRef} required />
        </div>

        <div className="inputContainer">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            ref={passwordRef}
            required
          />
        </div>

        <button type="submit" disabled={loading} className="btn">
          Login
        </button>
      </form>

      <div className="alreadyText">
        Need an account? <Link to="/signup">Sign up</Link>
      </div>
    </div>
  );
}

export default Login;
