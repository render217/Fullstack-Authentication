import React, { createContext, useContext, useState } from "react";
import useProfile from "../hooks/useProfile";

const AuthContext = createContext({
  user: {},
  token: "",
  setToken: () => {},
  setUser: () => {},
});
const AuthProvider = ({ children }) => {
  const { currentUser } = useProfile();
  const [user, setUser] = useState(currentUser);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
