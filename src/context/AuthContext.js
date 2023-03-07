import { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const value = {
    currentUser,
    signUp,
  };

  useEffect(() => {
    // onAuthStateChanged is an event listener that listens for changes to the user authentication state, gets triggered whenever the authentication state changes (user logs in or out). When a change is detected, the callback function passed as the second argument is called, and it receives the user object as an argument.
    // When onAuthStateChanged gets called, it returns a unsubsribe function, which is stored in unsubscribe variable.
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    // Calls the unsubscribe function when unmount.
    return unsubscribe;
  }, []);

  // Sign up new users. Returns a promise
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
