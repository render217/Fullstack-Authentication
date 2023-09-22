import React, { createContext, useContext, useEffect, useState } from "react";
import useProfile from "../hooks/useProfile";
import { checkLogInStatus } from "../api";
import { Loader } from "../components";
import { requestHandler } from "../util";

const AuthContext = createContext({
  isAuth: {},
  setIsAuth: () => {},
  getLoggedIn: async () => {},
});
const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(undefined);

  const [isLoading, setIsLoading] = useState(false);

  const getLoggedIn = async () => {
    const { data } = await checkLogInStatus();
    setIsAuth(data);
  };

  async function _initialize() {
    setIsLoading(true);
    setTimeout(async () => {
      await getLoggedIn();
      setIsLoading(false);
    }, 1000);
  }

  useEffect(() => {
    _initialize();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, getLoggedIn, setIsAuth }}>
      {isLoading ? <Loader /> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
