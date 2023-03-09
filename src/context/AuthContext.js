import { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // onAuthStateChanged is an event listener that listens for changes to the user authentication state, gets triggered whenever the authentication state changes (user logs in or out). When a change is detected, the callback function passed as the second argument is called, and it receives the user object as an argument.
    // When onAuthStateChanged gets called, it returns a unsubsribe function, which is stored in unsubscribe variable.
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // user is an object with basic properties: email, displayName..
      // https://firebase.google.com/docs/auth/web/manage-users
      setCurrentUser(user);
      // wait until first user is set
      setLoading(false);
    });

    // Calls the unsubscribe function when unmount.
    return unsubscribe;
  }, []);

  // Sign up new users. Returns a promise
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  // Login in user
  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Sign out user
  function logOut() {
    return signOut(auth);
  }

  // Reset user password
  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  // Update user email
  function updateUserEmail(email) {
    return updateEmail(auth.currentUser, email);
  }

  // Update user password
  function updateUserPassword(password) {
    return updatePassword(auth.currentUser, password);
  }

  const value = {
    currentUser,
    signUp,
    logIn,
    logOut,
    resetPassword,
    updateUserEmail,
    updateUserPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {/* does not render until onAuthStateChanged finishes */}
      {!loading && children}
    </AuthContext.Provider>
  );
}
