import React from "react";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="w-100 h-[100vh] grid place-items-center px-5 font-NotoSans">
      <div className="max-w-lg border border-clrPaleSlate rounded-3xl px-10 py-10">
        <div className="w-[330px]">
          <img className="mb-8 mx-auto" src="/logos/devchallenges.svg" alt="" />
          <h2 className="mb-3 text-3xl text-center font-semibold max-w-xs">
            Page Not Found
          </h2>

          <div className="text-clrMediumGrey">
            <p className="text-sm text-center">
              <Link to="/" className="text-clrCelestialBlue">
                Go Home
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
