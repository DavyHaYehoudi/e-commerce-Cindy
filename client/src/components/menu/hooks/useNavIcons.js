import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import useFirebaseImage from "../../../shared/hooks/useFirebaseImage";
import { resetCustomerStore } from "../../../features/accountClient/customerSlice";
import { resetStore } from "../../../features/authentication/authenticationSlice";

const useNavIcons = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state?.authentication?.token) || "";
  const role = useSelector((state) => state?.authentication?.role);
  const avatarPathClient = useSelector(
    (state) => state?.customer?.data?.client?.avatar
  );
  const avatarPathAdmin = "avatars/admin.png";
  const avatarPath = role === "admin" ? avatarPathAdmin : avatarPathClient;
  const { imageUrl } = useFirebaseImage(avatarPath) || {};

  const logout = useCallback(() => {
    dispatch(resetCustomerStore());
    dispatch(resetStore());
    localStorage.clear();
  }, [dispatch]);

  return {
    token,
    role,
    imageUrl,
    logout,
  };
};

export default useNavIcons;
