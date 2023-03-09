import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Form.css";

function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logOut } = useAuth();
  const navigate = useNavigate();

  async function handleLogOut() {
    setError("");

    try {
      await logOut();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <div className="container">
      {error !== "" && <div className="alert">{error}</div>}
      <h1 className="title">Profile</h1>
      <div className="form profile">
        <div className="email">
          <strong>Email:</strong> {currentUser.email}
        </div>
        <Link to="/update-profile" className="btn update">
          Update Profile
        </Link>
      </div>
      <button className="btn" onClick={handleLogOut}>
        Log Out
      </button>
    </div>
  );
}
export default Dashboard;
