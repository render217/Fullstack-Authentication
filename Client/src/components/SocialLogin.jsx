import React from "react";

export const SocialLogin = () => {
  const loginWithGoogle = () => {};
  const loginWithGithub = () => {};
  return (
    <>
      <div className="my-3 flex justify-center gap-5">
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
