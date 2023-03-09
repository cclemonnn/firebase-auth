import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Form.css";

function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { currentUser, updateUserEmail, updateUserPassword } = useAuth();

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    // Check passwords matches confirm password
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];

    setLoading(true);
    setError("");
    // check if the entered email is differenct from before
    if (emailRef.current.value !== currentUser.email) {
      // push return promise
      promises.push(updateUserEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updateUserPassword(passwordRef.current.value));
    }

    // Executes .then until promises resolves
    Promise.all(promises)
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="container">
      {error !== "" && <div className="alert">{error}</div>}
      <h1 className="title">Update Profile</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="inputContainer">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            ref={emailRef}
            defaultValue={currentUser.email}
            required
          />
        </div>

        <div className="inputContainer">
          <label htmlFor="password">Password (6 characters min):</label>
          <input
            type="password"
            id="password"
            name="password"
            ref={passwordRef}
            placeholder="Leave blank to keep the same"
          />
        </div>

        <div className="inputContainer">
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            ref={passwordConfirmRef}
            placeholder="Leave blank to keep the same"
          />
        </div>

        <button type="submit" disabled={loading} className="btn">
          Update
        </button>
      </form>

      <div className="alreadyText">
        <Link to="/" className="link">
          Cancel
        </Link>{" "}
      </div>
    </div>
  );
}

export default UpdateProfile;
