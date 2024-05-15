import React, { useState, createContext, useEffect } from "react";
import Login from "../components/Login";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../components/Authentication/Firebase/FirebaseApp";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const navigate=useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(() => {
          console.log(user);
          return user;
        });
      } else {
        setCurrentUser(null);
        navigate("/")
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {currentUser ? (
        children
      ) : (
        <Login />
      )}
    </UserContext.Provider>
  );
};

export default UserContext;
