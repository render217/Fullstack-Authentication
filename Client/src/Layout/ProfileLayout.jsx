import React, { useEffect, useState } from "react";
import { Header } from "../components";
import { Outlet } from "react-router-dom";
import useProfile from "../hooks/useProfile";

const ProfileLayout = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  let { user, setUser, reloadProfile, loading } = useProfile();
  return (
    <>
      <Header
        user={user}
        showDropDown={showDropDown}
        setShowDropDown={setShowDropDown}
      />
      <Outlet context={{ setShowDropDown, user, reloadProfile, loading }} />
    </>
  );
};

export default ProfileLayout;
