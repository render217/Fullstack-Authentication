import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import useProfile from "../hooks/useProfile";
import { requestHandler } from "../util";

export const SocialRedirect = () => {
  const navigate = useNavigate();
  const { getLoggedIn } = useAuth();
  const { user } = useProfile();

  useEffect(() => {
    getLoggedIn();
    navigate('/profile')
  }, []);
  return (
    <div className="w-100 h-[100vh] grid place-items-center px-5 font-NotoSans">
      <div className="max-w-lg border border-clrPaleSlate rounded-3xl px-10 py-10">
        <div className="w-[330px]">
          <img className="mb-8" src="/logos/devchallenges.svg" alt="" />
          <h2 className="mb-3 text-lg font-semibold max-w-xs text-center">
            Please wait...
          </h2>
          <div className="text-clrMediumGrey"></div>
        </div>
      </div>
    </div>
  );
};
