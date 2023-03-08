import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import s from "./Signup.module.css";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { logIn } = useAuth();

  //   useEffect(() => {
  //     let timeout;
  //     if (error !== "") {
  //       timeout = setTimeout(() => {
  //         setError("");
  //       }, 3000);
  //     }
  //     return () => {
  //       clearTimeout(timeout);
  //     };
  //   }, [error]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await logIn(emailRef.current.value, passwordRef.current.value);
    } catch {
      setError("Failed to sign in");
    }

    setLoading(false);
  }

  return (
    <div className={s.container}>
      {error !== "" && <div className={s.alert}>{error}</div>}
      <h1 className={s.signUpText}>Log in</h1>
      <form className={s.signUpForm} onSubmit={handleSubmit}>
        <div className={s.inputContainer}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" ref={emailRef} required />
        </div>

        <div className={s.inputContainer}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            ref={passwordRef}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          Login
        </button>
      </form>

      <div className={s.alreadyText}>
        Need an account? <Link to="/signup">Sign up</Link>
      </div>
    </div>
  );
}

export default Login;
