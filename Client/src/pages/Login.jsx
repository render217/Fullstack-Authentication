import React, { useEffect, useState } from "react";
import {
  Link,
  redirect,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { SocialLogin } from "../components";
import { toast } from "react-toastify";
import { requestHandler } from "../util";
import { loginUser } from "../api";
import { useAuth } from "../context/AuthProvider";

export const Login = () => {
  const { getLoggedIn } = useAuth();

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    let message = searchParams.get("message");
    if (message) {
      toast.error(message);
      message = null;
      setSearchParams({});
    }
  }, []);
  const [disable, setDisable] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!data.email) {
      toast.error("Email field is required");
      return;
    }
    if (!data.password) {
      toast.error("Password field is required");
      return;
    }

    await requestHandler(
      async () => await loginUser(data),
      setDisable,
      (res) => {
        const { data } = res;
        navigate("/profile");
        toast.success(res?.message);
        
        // check the status of logged in 
        getLoggedIn();
      },
      (err) => {
        toast.error(err?.response?.data?.message);
      }
    );
  };
  return (
    <div className="w-100 h-[100vh] grid place-items-center px-5 font-NotoSans">
      <div className="max-w-lg border border-clrPaleSlate rounded-3xl px-10 py-10">
        <div className="w-[330px]">
          <img className="mb-8" src="/logos/devchallenges.svg" alt="" />
          <h2 className="mb-3 text-lg font-semibold max-w-xs">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="text-clrMediumGrey border border-clrPaleSlate rounded-md ps-3 pe-2 flex items-center mb-3">
              <i className="fa-solid fa-envelope"></i>
              <input
                className="w-full py-2 ps-3 outline-0 border-none bg-transparent"
                type="email"
                placeholder="Email"
                autoComplete="off"
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>
            <div className="text-clrMediumGrey border border-clrPaleSlate rounded-md ps-3 pe-2 flex items-center  mb-3">
              <i className="fa-solid fa-lock"></i>
              <input
                className="w-full py-2 ps-3 outline-0 border-none bg-transparent"
                type="password"
                placeholder="Password"
                autoComplete="off"
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </div>
            <button
              type={disable ? "button" : "submit"}
              className={`${
                disable
                  ? "cursor-not-allowed bg-clrClearBlue/40 block w-full py-2   text-white rounded-md mb-8"
                  : "bg-clrClearBlue block w-full py-2   text-white rounded-md mb-8"
              }`}
            >
              <p>Login</p>
            </button>
          </form>
          <div className="text-clrMediumGrey">
            <p className="text-sm text-center">
              or continue with these social profile
            </p>

            <SocialLogin />
            <p className="text-sm text-center">
              Already a member?{" "}
              <Link to="/register" className="text-clrCelestialBlue">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
