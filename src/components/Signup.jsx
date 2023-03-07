import s from "./Signup.module.css";

function Signup() {
  return (
    <div className={s.container}>
      <form className={s.signUpForm}>
        <div className={s.inputContainer}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>

        <div className={s.inputContainer}>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>

        <div className={s.inputContainer}>
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
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
