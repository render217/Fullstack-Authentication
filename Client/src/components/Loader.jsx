import React from "react";

export const Loader = () => {
  return (
    <div className="w-100 h-[100vh] grid place-items-center px-5 font-NotoSans">
      <div className="max-w-lg  rounded-3xl px-10 py-10">
        <img
          className=" w-[300px] mx-auto"
          src="/logos/devchallenges.svg"
          alt=""
        />
        <p className="text-center my-2 text-clrMediumGrey text-xs">Full Stack Authentication</p>
      </div>
    </div>
  );
};
