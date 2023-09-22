import React from "react";

export const SocialLogin = () => {
  const loginWithGoogle = () => {
    window.open(`${import.meta.env.VITE_SERVER_URI}/auth/google`, "_self");
  };
  const loginWithGithub = () => {
    window.open(`${import.meta.env.VITE_SERVER_URI}/auth/github`, "_self");
  };
  return (
    <>
      <div className="my-3 flex justify-center gap-5" >
        <img
          onClick={loginWithGoogle}
          className="cursor-pointer"
          src="/logos/Google.svg"
          alt=""
        />
        <img
          onClick={loginWithGithub}
          className="cursor-pointer"
          src="/logos/Github.svg"
          alt=""
        />
        <img className="" src="/logos/Facebook.svg" alt="" />
        <img className="" src="/logos/Twitter.svg" alt="" />
      </div>
    </>
  );
};
