import { useRef } from "react";
import s from "./Signup.module.css";

function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  return (
    <div className={s.container}>
      <form className={s.signUpForm}>
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

        <button type="submit">Sign Up</button>
      </form>

      <div className={s.alreadyText}>Already have an account? Sign in</div>
    </div>
  );
}

export default Signup;
