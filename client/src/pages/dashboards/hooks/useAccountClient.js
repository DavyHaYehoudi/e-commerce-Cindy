import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useTokenExpiration from "../../authentication/hooks/useTokenExpiration";
import useClientFromToken from "../../authentication/hooks/useClientFromToken";
import useFetchSliceCustomer from "../../../selectors/useFetchSliceCustomer";
import useProfilChange from "./useProfilChange";
import { addToken } from "../../../features/authentication/authenticationSlice";

const useAccountClient = () => {
  useTokenExpiration();
  const { clientId, token, role } = useClientFromToken() || "";
  useFetchSliceCustomer(clientId);
  const dispatch = useDispatch();
  useEffect(() => {
    if (token && role === "user") {
      dispatch(addToken(token));
    }
    return;
  }, [dispatch, role, token]);

  const dataClient = useSelector((state) => state?.customer?.data?.client);
  const [selectedTab, setSelectedTab] = useState("Compte");

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const {
    handleChangeProfilSave,
    isEditing,
    setIsEditing,
    setIsModified,
    isModified,
    handleChangeProfilEdit,
  } = useProfilChange();

  return {
    clientId,
    dataClient,
    selectedTab,
    handleTabChange,
    handleChangeProfilSave,
    isEditing,
    setIsEditing,
    setIsModified,
    isModified,
    handleChangeProfilEdit,
  };
};

export default useAccountClient;
