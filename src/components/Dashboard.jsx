import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { BsCardImage } from "react-icons/bs";
import { storage } from "../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import d from "./Dashboard.module.css";

function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logOut } = useAuth();
  const navigate = useNavigate();

  // Images
  const [imageFile, setImageFile] = useState(null);
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const listRef = ref(storage, `${currentUser.uid}/`);

      listAll(listRef).then((res) => {
        res.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            setImageList((prev) => [...prev, url]);
          });
        });
      });
    }
  }, []);

  function handleFileInputChange(e) {
    setImageFile(e.target.files[0]);
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    if (!imageFile) return;

    const imageRef = ref(storage, `${currentUser.uid}/${imageFile.name}`);

    try {
      const snapshot = await uploadBytes(imageRef, imageFile);
      const url = await getDownloadURL(snapshot.ref);

      setImageList((prev) => [...prev, url]);
      console.log(setImageList);
      alert("image uploaded");
    } catch (error) {
      console.error(error);
    }
  }

  async function handleLogOut() {
    setError("");
    try {
      await logOut();
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <nav className={d.nav}>
        <h1 className={d.titleContainer}>
          <BsCardImage className={d.imageIcon} />
          <div className={d.titleText}>Upload Your Images</div>
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

          {/* Upload Form */}
          <form
            onSubmit={handleFormSubmit}
            className={`${d.card} ${d.uploadForm}`}
          >
            <input
              type="file"
              accept="image/*"
              className={d.uploadInput}
              onChange={handleFileInputChange}
            />
            <button type="submit" className={d.btn}>
              Upload Image
            </button>
          </form>

          {imageList.map((url) => {
            return <img src={url} alt="" />;
          })}
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
