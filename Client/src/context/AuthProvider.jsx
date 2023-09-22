import React, { createContext, useContext, useEffect, useState } from "react";
import useProfile from "../hooks/useProfile";
import { checkLogInStatus } from "../api";
import { Loader } from "../components";

const AuthContext = createContext({
  isAuth: {},
  setIsAuth: () => {},
  getLoggedIn: () => {},
});
const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const getLoggedIn = async () => {
    setIsLoading(true);
    const status = await checkLogInStatus();
    setIsAuth(status.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, getLoggedIn, setIsAuth }}>
      {isLoading ? <Loader /> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
