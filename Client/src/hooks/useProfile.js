import { useEffect, useState } from "react";
import { requestHandler } from "../util";
import { getUserProfile } from "../api";

const useProfile = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);

  const reloadProfile = () => {
    console.log("before reload", currentUser?.email);
    setReload(!reload);
    console.log("after reload", currentUser?.email);
  };
  const getProfileData = async () => {
    await requestHandler(
      async () => getUserProfile(),
      setLoading,
      (res) => {
        const {
          data: { user },
        } = res;
        const profileImage =
          user?.profileImage?.imageUrl ||
          user?.profileImage?.socialImage ||
          user?.profileImage?.defaultImage;

        let mappedUser = {
          ...user,
          profileImage,
        };

        setCurrentUser(mappedUser);
      },
      (err) => {
        console.log(err?.response?.data?.message);
      }
    );
  };

  useEffect(() => {
    getProfileData();
  }, [reload]);

  return { currentUser, reloadProfile, loading };
};

export default useProfile;
