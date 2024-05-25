import React, { createContext, useState } from "react";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const userFromLC = localStorage.getItem("user");
  if (userFromLC && !user.username) {
    setUser(JSON.parse(userFromLC));
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
