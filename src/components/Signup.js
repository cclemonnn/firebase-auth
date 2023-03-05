function Signup() {
  return (
    <form>
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" required />

      <label htmlFor="password">Password:</label>
      <input type="password" id="password" name="password" required />

      <label htmlFor="confirm-password">Confirm Password:</label>
      <input
        type="password"
        id="confirm-password"
        name="confirm-password"
        required
      />

      <button type="submit">Sign Up</button>
    </form>
  );
}

export default Signup;
