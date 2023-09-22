import React, { useEffect, useState } from "react";
import { Link, useOutletContext, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

import useProfile from "../../hooks/useProfile";
import Skeleton from "react-loading-skeleton";

export const Profile = () => {
  const { setShowDropDown, user, reloadProfile, loading } = useOutletContext();

  // let { user, loading, reloadProfile } = useProfile();

  const encryptedPassword = (pswd = "samplepass") => {
    return new Array(pswd.length).fill("*").join("");
  };

  return (
    <>
      <div className="pb-10" onClick={() => setShowDropDown(false)}>
        <main className="max-w-5xl px-5 mx-auto font-NotoSans">
          <h1 className="text-3xl text-center mb-3">Personal info</h1>
          <p className="text-base text-center">
            Basic info, like your name and photo
          </p>
          <ul className="border border-clrPaleSlate rounded-md  mt-3">
            <li className="border-b border-clrPaleSlate px-8 py-6 min-h-24">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-semibold text-2xl max-[550px]:text-2xl">
                    Profile
                  </h2>
                  <p className="text-clrMediumGrey max-[550px]:text-sm">
                    {" "}
                    Some info may be visible to other people
                  </p>
                </div>
                <Link
                  to="/profile/update"
                  state={user}
                  className="border border-clrPaleSlate rounded-md px-3 py-2 max-[550px]:text-sm"
                >
                  Edit Profile
                </Link>
              </div>
            </li>
            <li className="border-b border-clrPaleSlate px-8 py-6">
              <div className="flex items-center">
                <p className="basis-1/3 text-clrPaleSlate uppercase">photo</p>
                {loading ? (
                  <Skeleton />
                ) : (
                  <img
                    className="w-14 block max-[550px]:text-right"
                    src={user.profileImage}
                    alt=""
                  />
                )}
              </div>
            </li>
            <li className="border-b border-clrPaleSlate px-8 py-5 ">
              <div className="flex items-center">
                <p className="basis-1/3 text-clrPaleSlate uppercase">name</p>
                <p className="basis-2/3 text-clrDarkGrey text-lg max-[550px]:text-right">
                  {loading ? <Skeleton /> : user?.username}
                </p>
              </div>
            </li>
            <li className="border-b border-clrPaleSlate px-8 py-5 ">
              <div className="flex items-center">
                <p className="basis-1/3 text-clrPaleSlate uppercase">Bio</p>
                <p className="basis-2/3 text-clrDarkGrey text-lg max-[550px]:text-right">
                  {loading ? <Skeleton /> : user?.bio || "-"}
                </p>
              </div>
            </li>
            <li className="border-b border-clrPaleSlate px-8 py-5 ">
              <div className="flex items-center">
                <p className="basis-1/3 text-clrPaleSlate uppercase">Phone</p>
                <p className="basis-2/3 text-clrDarkGrey text-lg max-[550px]:text-right">
                  {loading ? <Skeleton /> : user?.phone || "-"}
                </p>
              </div>
            </li>
            <li className="border-b border-clrPaleSlate px-8 py-5">
              <div className="flex items-center">
                <p className="basis-1/3 text-clrPaleSlate uppercase">Email</p>
                <p className="basis-2/3 text-clrDarkGrey text-lg max-[550px]:text-right">
                  {loading ? <Skeleton /> : user?.email || "-"}
                </p>
              </div>
            </li>
            <li className="border-b border-clrPaleSlate px-8 py-5 ">
              <div className="flex items-center">
                <p className="basis-1/3 text-clrPaleSlate uppercase">
                  Password
                </p>
                <p className="basis-2/3 text-clrDarkGrey text-lg max-[550px]:text-right">
                  {loading ? <Skeleton /> : encryptedPassword(user?.password)}
                </p>
              </div>
            </li>
          </ul>
        </main>
      </div>
    </>
  );
};
