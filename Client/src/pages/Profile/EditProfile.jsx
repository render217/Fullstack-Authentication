import React, { useEffect, useState } from "react";
import { Link, useOutlet, useOutletContext } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { requestHandler } from "../../util";
import { getUserProfile, updateUserProfile } from "../../api";
import { toast } from "react-toastify";
import useProfile from "../../hooks/useProfile";
import Skeleton from "react-loading-skeleton";

export const EditProfile = () => {
  const outletCtx = useOutletContext();
  const { loading, currentUser, reloadProfile } = useProfile();
  const [data, setData] = useState();
  const [disable, setDisable] = useState(false);
  useEffect(() => {
    if (currentUser?.username) {
      const { bio, email, phone, password, username } = currentUser;
      setData({
        bio,
        email,
        phone,
        password,
        username,
      });
    }
  }, [currentUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await requestHandler(
      async () => updateUserProfile(data),
      setDisable,
      (res) => {
        const {
          data: { user },
        } = res;
        console.log("updated user");
        toast.success(res?.message);
        console.log(user);
        reloadProfile();
      },
      (err) => {
        toast.error(err?.response?.data?.message);
      }
    );
  };

  return (
    <>
      <div
        className="pb-10 px-4"
        onClick={() => outletCtx.setShowDropDown(false)}
      >
        <Link
          to="/profile"
          className="block text-clrCelestialBlue space-x-2 max-w-5xl  mx-auto "
        >
          <span>
            <i className="text-sm fa-solid fa-chevron-left"></i>
          </span>
          <span>Back</span>
        </Link>
        <main className="border border-clrPaleSlate rounded-md  py-6  px-5 mt-3 max-w-5xl  mx-auto font-NotoSans">
          <h1 className="text-2xl">Change Info</h1>
          <p className="text-xs text-clrMediumGrey">
            Changes will be reflected to every services
          </p>
          <div>
            <div className="my-5 flex items-center gap-5">
              <div className="h-16 w-16 rounded-md overflow-hidden relative">
                <img
                  className=" cursor-pointer h-full w-full object-cover"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe6l-J8PqR-hPEsyazSdxuDLgUGy2mPzELNT9dfBUeZvtlrGzSY0iNFsrOntDObPg99K4&usqp=CAU"
                  alt=""
                />
                <i className="absolute top-6 left-6 text-white fa-solid fa-camera"></i>
              </div>
              <p className=" cursor-pointer text-xs uppercase text-clrMediumGrey">
                Change photo
              </p>
            </div>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-5 max-w-sm">
                <p className="text-xs mb-1 text-clrVampireGrey">Name</p>
                {loading ? (
                  <Skeleton />
                ) : (
                  <input
                    className="w-full text-xs border-2 rounded-lg px-3 py-2 "
                    placeholder="Enter you name..."
                    type="text"
                    name="username"
                    value={data?.username || ""}
                    onChange={(e) => handleInputChange(e)}
                  />
                )}
              </div>
              <div className="mb-5 max-w-sm">
                <p className="text-xs mb-1 text-clrVampireGrey">Bio</p>
                {/* {loading ? <Skeleton/> : (

                )} */}
                {loading ? (
                  <Skeleton />
                ) : (
                  <textarea
                    className="w-full text-xs border-2 rounded-lg px-3 py-2"
                    placeholder="Enter you bio..."
                    type="text"
                    name="bio"
                    value={data?.bio  || ""}
                    onChange={(e) => handleInputChange(e)}
                  />
                )}
              </div>
              <div className="mb-5 max-w-sm">
                <p className="text-xs  mb-1 text-clrVampireGrey">Phone</p>
                {loading ? (
                  <Skeleton />
                ) : (
                  <input
                    className="w-full text-xs border-2 rounded-lg px-3 py-2 "
                    placeholder="Enter you phone..."
                    name="phone"
                    value={data?.phone || ""}
                    onChange={(e) => handleInputChange(e)}
                  />
                )}
              </div>
              <div className="mb-5 max-w-sm">
                <p className="text-xs  mb-1 text-clrVampireGrey">Email</p>
                {loading ? (
                  <Skeleton />
                ) : (
                  <input
                    className="w-full text-xs border-2 rounded-lg px-3 py-2 "
                    placeholder="Enter you email..."
                    type="email"
                    name="email"
                    value={data?.email || ""}
                    onChange={(e) => handleInputChange(e)}
                    disabled={
                      currentUser?.providerType === "email_password"
                        ? false
                        : true
                    }
                    // disabled={false}
                  />
                )}
                {loading ? (
                  <Skeleton />
                ) : (
                  user?.loginType !== "EMAIL_PASSWORD" && (
                    <span className="text-[11px] text-clrMediumGrey block">
                      you can only edit your email if you registered with email
                      and password
                    </span>
                  )
                )}
              </div>
              <div className="mb-5 max-w-sm">
                <p className="text-xs mb-1 ">Password</p>
                {loading ? (
                  <Skeleton />
                ) : (
                  <input
                    className="w-full text-xs border-2 rounded-lg px-3 py-2 "
                    placeholder="Enter you new password..."
                    type="text"
                    name="password"
                    value={data?.password  || ""}
                    onChange={(e) => handleInputChange(e)}
                  />
                )}
              </div>
              <button
                type={disable ? "button" : "submit"}
                className={
                  disable
                    ? "text-white bg-clrClearBlue/60 cursor-not-allowed px-4 py-1 rounded-md hover:opacity-95"
                    : "text-white bg-clrClearBlue cursor-pointer px-4 py-1 rounded-md hover:opacity-95"
                }
              >
                Save
              </button>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};
