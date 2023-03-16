import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { BsCardImage } from "react-icons/bs";
import d from "./Dashboard.module.css";

function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logOut } = useAuth();
  const navigate = useNavigate();

  async function handleLogOut() {
    setError("");

    try {
      await logOut();
      // navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <nav className={d.nav}>
        <h1 className={d.titleContainer}>
          <BsCardImage className={d.imageIcon} />
          <div className={d.titleText}>Upload Your Pictures</div>
        </h1>
      </nav>
      {currentUser ? (
        <div className={d.signedContainer}>
          <div className={d.userContainer}>
            <div className={d.email}>
              <b>Email: </b>
              {currentUser.email}
            </div>

            <div className={d.btns}>
              <button className={d.btn}>
                <Link to="/update-profile" className={d.link}>
                  Update Profile
                </Link>
              </button>
              <button className={d.btn} onClick={handleLogOut}>
                Log Out
              </button>
            </div>
          </div>

          <form className={`${d.card} ${d.uploadForm}`}>
            <input type="file" accept="image/*" className={d.uploadInput} />
            <button type="submit" className={d.btn}>
              Upload
            </button>
          </form>
        </div>
      ) : (
        <div className={d.unsignedContainer}>
          <div className={d.card}>
            <button className={`${d.btn} ${d.logInBtn}`}>
              <Link to="/login" className={d.link}>
                Log In
              </Link>
            </button>
            <div className={d.noAccount}>
              Need an account?{" "}
              <Link to="/signup" className={d.signUpLink}>
                Sign up
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default Dashboard;

// {error !== "" && <div className="alert">{error}</div>}
// <h1 className="title">Profile</h1>
// <div className="form profile">
//   <div className="email">
//     <strong>Email:</strong> {currentUser.email}
//   </div>
//   <Link to="/update-profile" className="btn update">
//     Update Profile
//   </Link>
// </div>
// <button className="btn" onClick={handleLogOut}>
//   Log Out
// </button>
