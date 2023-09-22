import React, { useRef, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useOutletContext,
} from "react-router-dom";

import { requestHandler } from "../../util";
import { getUserProfile, updateUserProfile } from "../../api";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";

export const EditProfile = () => {
  const { setShowDropDown, user, reloadProfile, loading } = useOutletContext();
  const navigate = useNavigate();

  // for fast reload
  const stateUser = useLocation().state;

  const [updatingProfile, setUpdatingProfile] = useState(false);

  const fileRef = useRef();

  const [data, setData] = useState({
    email: stateUser?.email || user?.email || "",
    bio: stateUser?.bio || user?.bio || "",
    phone: stateUser?.phone || user?.phone || "",
    password: stateUser?.password || user?.password || "",
    username: stateUser?.username || user?.username || "",
  });

  const [imageFile, setImageFile] = useState();
  const [imagePreview, setImagePreview] = useState();

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
    const formData = new FormData();

    formData.append("email", data.email);
    formData.append("bio", data.bio);
    formData.append("phone", data.phone);
    formData.append("password", data.password);
    formData.append("username", data.username);
    formData.append("profileImage", imageFile);

    await requestHandler(
      async () => await updateUserProfile(formData),
      setUpdatingProfile,
      (res) => {
        const { data } = res;
        toast.success(res?.message);
        reloadProfile();
        navigate("/profile");
      },
      (err) => {
        toast.error(err?.response?.data?.message);
        setImagePreview(null);
        setImageFile(null);
      }
    );
  };

  return (
    <>
      <div className="pb-10 px-4" onClick={() => setShowDropDown(false)}>
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
            <form onSubmit={handleFormSubmit}>
              <div className="my-5 flex items-center gap-5">
                <div className="h-16 w-16 rounded-md overflow-hidden relative">
                  {imagePreview ? (
                    <img
                      className=" cursor-pointer h-full w-full object-cover"
                      src={imagePreview}
                      alt="asdf"
                    />
                  ) : (
                    <img
                      className=" cursor-pointer h-full w-full object-cover"
                      src={user?.profileImage}
                      alt=""
                    />
                  )}
                  <i className="absolute top-6 left-6 text-white fa-solid fa-camera"></i>
                </div>

                {updatingProfile ? (
                  <p>saving...</p>
                ) : (
                  <label className="flex items-center space-x-2">
                    <span className="hidden">
                      <input
                        type="file"
                        ref={fileRef}
                        onChange={(e) => {
                          setImageFile(e.target.files[0]);
                          setImagePreview(
                            URL.createObjectURL(e.target.files[0])
                          );
                        }}
                      />
                    </span>
                    <button
                      type="button"
                      onClick={() => fileRef.current.click()}
                      className="cursor-pointer text-xs uppercase text-clrMediumGrey"
                    >
                      Change photo
                    </button>
                  </label>
                )}
              </div>

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
                    value={data?.bio || ""}
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
                      user?.providerType === "email_password" ? false : true
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
                    value={data?.password || ""}
                    onChange={(e) => handleInputChange(e)}
                  />
                )}
              </div>
              <button
                type={updatingProfile ? "button" : "submit"}
                className={
                  updatingProfile
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
