import React from "react";
import {
  Link,
  NavLink,
  Navigate,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import { requestHandler } from "../util";
import { logoutUser } from "../api";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthProvider";


export const Header = ({ user, showDropDown, setShowDropDown }) => {
  const { isAuth, getLoggedIn, setIsAuth } = useAuth();
  

  const navigate = useNavigate();

  const handleLogout = async () => {
    await requestHandler(
      async () => logoutUser(),
      null,
      async (res) => {
        setIsAuth(false);
        getLoggedIn();
        navigate("/");
        toast.success(res?.message);
        // setIsAuth(false);
      },
      (err) => {
        toast.error(err?.response?.data?.message);
      }
    );
  };

  return (
    <>
      <header
        className="px-5 py-5"
        onClick={(e) => {
          e.stopPropagation();
          setShowDropDown(false);
        }}
      >
        <div className="relative max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/profile">
            <img className="w-40" src="/logos/devchallenges.svg" alt="" />
          </Link>
          <div
            onClick={(e) => {
              e.stopPropagation();
              setShowDropDown(!showDropDown);
            }}
            className=" flex items-center gap-2 cursor-pointer"
          >
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={user?.profileImage}
                alt="profileImage"
              />
            </div>
            <p className="cursor-pointer">{user?.username}</p>
            <i className="cursor-pointer fa-solid fa-caret-down"></i>
          </div>
          {showDropDown && (
            <div className="text-sm px-2 py-2 rounded-md absolute w-36 right-0 top-10 border border-clrPaleSlate  bg-white ">
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive
                    ? "mb-2 cursor-pointer px-2 rounded-md flex bg-clrSeashell items-center py-2 gap-5 "
                    : `mb-2 cursor-pointer px-2 rounded-md flex  hover:bg-clrSeashell items-center py-2  gap-5  `
                }
              >
                <i className="fa-solid fa-user"></i>
                <p>profile</p>
              </NavLink>
              <div className="mb-2 cursor-pointer px-2 rounded-md flex  hover:bg-clrSeashell items-center py-2  gap-5 ">
                <i className="fa-brands fa-weixin"></i>
                <p>Group Chat</p>
              </div>
              <div
                onClick={handleLogout}
                className="cursor-pointer px-2 rounded-md flex hover:bg-clrSeashell items-center py-2  gap-5  border-t border-clrPaleSlate text-red-500"
              >
                <i className="fa-solid fa-arrow-right-to-bracket"></i>
                <p>Logout</p>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};
