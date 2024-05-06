import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useClientFromToken from "../../authentication/hooks/useClientFromToken";
import useFetchSliceCustomer from "../../../selectors/useFetchSliceCustomer";
import useProfilChange from "./useProfilChange";
import { addToken } from "../../../features/authentication/authenticationSlice";
import { useNavigate } from "react-router-dom";

const useAccountClient = () => {
  const { clientId, token, role } = useClientFromToken() || "";
  useFetchSliceCustomer(clientId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (token && role === "user") {
      dispatch(addToken(token));
    }
    if (!token) {
      navigate("/account/login");
    }
    return;
  }, [dispatch, role, token, navigate]);

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
