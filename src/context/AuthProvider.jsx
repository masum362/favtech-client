import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from "../firebase/firebase.init";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
  const gogleProvider = new GoogleAuthProvider();
  const [user, setUser] = useState(null)
  const [themeMode, setThemeMode] = useState(localStorage.getItem("theme") || "light")
  const [loading, setLoading] = useState(true);


  const darkMode = () => {
    setThemeMode("dark");
    localStorage.setItem("theme", "dark")
  }
  const lightMode = () => {
    setThemeMode("light");
    localStorage.setItem("theme", "light")
  }


  const RegisterUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const LoginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const loginWithGogle = () => {
    return signInWithPopup(auth, gogleProvider)
  }


  const updateUser = (user, displayName, photoURL) => {
    setLoading(true)
    return updateProfile(user, {
      displayName, photoURL
    })
  }

  const LogOutUser = () => {
    setLoading(true)
    return signOut(auth);
  }

  useEffect(() => {

    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
      } else {
        setLoading(false)
        console.log("user not found")
        setUser(null)
      }
    })
    return () => {
      unSubscribe();
    }
  }, [])

  console.log(user)

  const values = { user, RegisterUser, LoginUser, LogOutUser, loading, loginWithGogle, updateUser, setLoading, themeMode, darkMode, lightMode }


  return (
    <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider