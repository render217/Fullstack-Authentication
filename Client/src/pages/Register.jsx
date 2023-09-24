import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SocialLogin } from "../components";
import { requestHandler } from "../util";
import { registerUser } from "../api";
import { toast } from "react-toastify";
import validator from "../validators/validator";
import { RegisterSchema } from "../validators/validationSchema";
export const Register = () => {
  const navigate = useNavigate();

  // state to disable form button
  const [disable, setDisable] = useState(false);

  // form input values
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();

    // validate input data
    const { errors } = await validator(RegisterSchema, data);
    if (errors.length) {
      toast.error(errors[0]);
      return;
    }

    // call api
    await requestHandler(
      async () => registerUser(data),
      setDisable,
      (res) => {
        const { data } = res;
        toast.success(res?.message);
        navigate("/");
      },
      (err) => {
        if (!err?.response) {
          toast.error("Network error");
        } else {
          toast.error(err?.response?.data?.message);
        }
      }
    );

    //clear input values
    setData((prev) => {
      return {
        ...prev,
        email: "",
        password: "",
      };
    });
  };

  
  return (
    <div className="w-100 h-[100vh] grid place-items-center px-5 font-NotoSans">
      <div className="max-w-lg border border-clrPaleSlate rounded-3xl px-10 py-10">
        <div className="w-[330px]">
          <img className="mb-8" src="/logos/devchallenges.svg" alt="" />
          <h2 className="mb-3 text-lg font-semibold max-w-xs">
            Join thousands of learners from around the world{" "}
          </h2>
          <p className="mb-6 text-base max-w-xs">
            Master web development by making real-life projects. There are
            multiple paths for you to choose
          </p>

          <form onSubmit={handleRegister}>
            <div className="text-clrMediumGrey border border-clrPaleSlate rounded-md ps-3 pe-2 flex items-center mb-3">
              <i className="fa-solid fa-envelope"></i>
              <input
                className="w-full py-2 ps-3 outline-0 border-none bg-transparent"
                type="email"
                placeholder="Email"
                value={data.email}
                autoComplete="off"
                autoFocus="off"
                autoSave="off"
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>
            <div className="text-clrMediumGrey border border-clrPaleSlate rounded-md ps-3 pe-2 flex items-center  mb-3">
              <i className="fa-solid fa-lock"></i>
              <input
                className="w-full py-2 ps-3 outline-0 border-none bg-transparent"
                type="password"
                placeholder="Password"
                value={data.password}
                autoComplete="off"
                autoFocus="off"
                autoSave="off"
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </div>
            <button
              type={disable ? "button" : "submit"}
              disabled={disable}
              className={`${
                disable
                  ? "cursor-not-allowed bg-clrClearBlue/40 block w-full py-2   text-white rounded-md mb-8"
                  : "bg-clrClearBlue block w-full py-2   text-white rounded-md mb-8"
              }`}
            >
              <p>Start coding now</p>
            </button>
          </form>
          <div className="text-clrMediumGrey">
            <p className="text-sm text-center">
              or continue with these social profile
            </p>
            <SocialLogin />
            <p className="text-sm text-center">
              Already a member?{" "}
              <Link to="/" className="text-clrCelestialBlue">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
