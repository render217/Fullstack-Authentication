import { useEffect, useState } from "react";
import { requestHandler } from "../util";
import { getUserProfile } from "../api";

const useProfile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);

  const reloadProfile = () => {
    setReload(!reload);
  };

  const getProfileData = async () => {
    await requestHandler(
      async () => await getUserProfile(),
      setLoading,
      (res) => {
        const { data } = res;

        const profileImage =
          data.user?.profileImage?.imageUrl ||
          data.user?.profileImage?.socialImage ||
          data.user?.profileImage?.defaultImage;

        let mappedUser = {
          ...data.user,
          profileImage,
        };

        setUser(mappedUser);
      },
      (err) => {
        // console.log(err?.response?.data?.message);
      }
    );
  };

  useEffect(() => {
    getProfileData();
  }, [reload]);

  return { user, setUser, reloadProfile, loading };
};

export default useProfile;
