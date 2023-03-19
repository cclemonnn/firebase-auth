import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { BsCardImage } from "react-icons/bs";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { storage } from "../firebase";
import {
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import d from "./Dashboard.module.css";

function Dashboard() {
  const { currentUser, logOut } = useAuth();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Images
  const [imageFile, setImageFile] = useState(null);
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const listRef = ref(storage, `${currentUser.uid}/`);

      listAll(listRef).then((res) => {
        res.items.forEach((item) => {
          console.log("item:", item);
          getDownloadURL(item)
            .then((url) => {
              setImageList((prev) => [
                ...prev,
                {
                  url,
                  fullPath: item.fullPath,
                  fileName: getFileName(item.fullPath),
                },
              ]);
            })
            .catch((error) => {
              setError("Failed to load image");
              console.error(error);
            });
        });
      });
    }
  }, []);

  function getFileName(path) {
    return path.split("/").pop();
  }

  function handleFileInputChange(e) {
    setImageFile(e.target.files[0]);
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    if (!imageFile) return;

    // Check if fileName already in imageList
    const fileExists = imageList.some((img) => img.fileName === imageFile.name);

    if (fileExists) {
      showError("File name already exists");
      return;
    }

    const imageRef = ref(storage, `${currentUser.uid}/${imageFile.name}`);

    try {
      const snapshot = await uploadBytes(imageRef, imageFile);
      console.log(snapshot.metadata.name);
      const url = await getDownloadURL(snapshot.ref);

      setImageList((prev) => [
        ...prev,
        {
          url,
          fullPath: snapshot.metadata.fullPath,
          fileName: snapshot.metadata.name,
        },
      ]);
      showSuccess("Image uploaded");
    } catch (error) {
      showError("Upload failed. Please try again.");
    }
  }

  async function handleDelete(img) {
    const confirmed = window.confirm(`Delete ${img.fileName} ?`);

    if (confirmed) {
      const deleteRef = ref(storage, img.fullPath);

      try {
        await deleteObject(deleteRef);
        setImageList((prev) => prev.filter((item) => item !== img));
        showSuccess("Image deleted");
      } catch (error) {
        showError("Failed to delete");
        console.error(error);
      }
    }
  }

  async function handleLogOut() {
    setError("");
    try {
      await logOut();
      showSuccess("Log out successful");
    } catch {
      showError("Failed to log out");
    }
  }

  function showError(msg) {
    setError(msg);
    setTimeout(() => {
      setError("");
    }, 4000);
  }

  function showSuccess(msg) {
    setSuccess(msg);
    setTimeout(() => {
      setSuccess("");
    }, 4000);
  }

  return (
    <>
      <nav className={d.nav}>
        <h1 className={d.titleContainer}>
          <BsCardImage className={d.imageIcon} />
          <div className={d.titleText}>Upload Your Images</div>
        </h1>

        <div className={`${d.alert} ${d.error} ${error !== "" && d.show}`}>
          {error}
        </div>
        <div className={`${d.alert} ${d.success} ${success !== "" && d.show}`}>
          {success}
        </div>
      </nav>
      {currentUser ? (
        <div className={d.signedContainer}>
          <div className={d.userContainer}>
            <div className={d.emailContainer}>
              Email: <span className={d.email}>{currentUser.email}</span>
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

          <div className={d.imgContainer}>
            {imageList.map((img) => {
              return (
                <div className={d.imgCard}>
                  <img src={img.url} alt="" className={d.images} />
                  <div className={d.fileNameContainer}>
                    <div className={d.fileName}>{img.fileName}</div>
                    <RiDeleteBin2Fill
                      onClick={() => handleDelete(img)}
                      className={d.binIcon}
                    />
                  </div>
                </div>
              );
            })}
          </div>
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
