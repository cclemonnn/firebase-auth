import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Form.css";

function ForgotPassword() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { resetPassword } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);

      setMessage("Check your inbox for futher instructions");
    } catch {
      setMessage("");
      setError("Failed to reset password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      {error !== "" && <div className="alert">{error}</div>}
      {message !== "" && <div className="message">{message}</div>}
      <h1 className="title">Password Reset</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="inputContainer">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" ref={emailRef} required />
        </div>

        <div className="btnContainer">
          <button type="submit" disabled={loading} className="btn">
            Reset Password
          </button>
          <Link to="/login" className="forgot link">
            Login
          </Link>
        </div>
      </form>

      <div className="alreadyText">
        Need an account?{" "}
        <Link to="/signup" className="link">
          Sign up
        </Link>
      </div>
    </div>
  );
}

export default ForgotPassword;
