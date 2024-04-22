import React, { useState, createContext } from "react";
import Login from "../components/Login";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {currentUser ? children : <Login />}
    </UserContext.Provider>
  );
};

export default UserContext;
