/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState } from "react";
// import useProfile from "../hooks/useProfile";
import { checkLogInStatus } from "../api";
import { Loader } from "../components";
// import { requestHandler } from "../util";

const AuthContext = createContext({
    isAuth: {},
    setIsAuth: () => {},
    getLoggedIn: async () => {},
});
const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(undefined);

    const [isLoading, setIsLoading] = useState(true);

    const getLoggedIn = async () => {
        const { data } = await checkLogInStatus();
        setIsAuth(data);
    };

    useEffect(() => {
        async function _initialize() {
            setIsLoading(true);
            // setTimeout(async () => {
            await getLoggedIn();
            setIsLoading(false);
            // }, 1000);
        }

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
