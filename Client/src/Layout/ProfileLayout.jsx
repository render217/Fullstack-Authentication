import React, { useEffect, useState } from "react";
import { Header } from "../components";
import { Outlet } from "react-router-dom";


const ProfileLayout = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  return (
    <>
      <Header showDropDown={showDropDown} setShowDropDown={setShowDropDown} />
      <Outlet context={{ setShowDropDown }} />
    </>
  );
};

export default ProfileLayout;
