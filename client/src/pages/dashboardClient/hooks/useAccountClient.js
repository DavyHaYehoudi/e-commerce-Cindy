import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetchSliceCustomer from "../../../selectors/useFetchSliceCustomer";
import useProfilChange from "./useProfilChange";
import {
  addRole,
  addToken,
} from "../../../features/authentication/authenticationSlice";

const useAccountClient = () => {
  const [clientId, setClientId] = useState(null);
  useFetchSliceCustomer(clientId);

  const dispatch = useDispatch();

  const dataClient = useSelector((state) => state?.customer?.data?.client);
  const [selectedTab, setSelectedTab] = useState("Compte");

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    const tokenParse = JSON.parse(atob(token.split(".")[1]));
    setClientId(tokenParse?.clientId);
    dispatch(addToken(token));
    dispatch(addRole(tokenParse?.role));
  }, [dispatch]);
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
