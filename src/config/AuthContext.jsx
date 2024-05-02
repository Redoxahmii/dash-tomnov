import { createContext, useState } from "react";
export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const value = {
    users,
    setUsers,
    isLoggedIn,
    setIsLoggedIn,
    username,
    setUsername,
    password,
    setPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
