import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import s from "./Signup.module.css";

function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signUp } = useAuth();

  // useEffect(() => {
  //   let timeout;
  //   if (error !== "") {
  //     timeout = setTimeout(() => {
  //       setError("");
  //     }, 3000);
  //   }
  //   return () => {
  //     clearTimeout(timeout);
  //   };
  // }, [error]);

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
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  return (
    <div className={s.container}>
      {error !== "" && <div className={s.alert}>{error}</div>}
      <h1 className={s.signUpText}>Sign Up</h1>
      <form className={s.signUpForm} onSubmit={handleSubmit}>
        <div className={s.inputContainer}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" ref={emailRef} required />
        </div>

        <div className={s.inputContainer}>
          <label htmlFor="password">Password (6 characters min):</label>
          <input
            type="password"
            id="password"
            name="password"
            ref={passwordRef}
            required
          />
        </div>

        <div className={s.inputContainer}>
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            ref={passwordConfirmRef}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          Sign Up
        </button>
      </form>

      <div className={s.alreadyText}>
        Already have an account? <Link to="/login">Log In</Link>{" "}
      </div>
    </div>
  );
}

export default Signup;
