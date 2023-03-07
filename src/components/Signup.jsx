import { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import s from "./Signup.module.css";

function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signUp } = useAuth();

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

      <div className={s.alreadyText}>Already have an account? Sign in</div>
    </div>
  );
}

export default Signup;
