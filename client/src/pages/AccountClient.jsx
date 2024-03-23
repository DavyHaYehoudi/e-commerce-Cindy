import React, { useState } from "react";
import InfoClient from "../components/accountClient/info/InfoClient";
import { useSelector } from "react-redux";
import useFetchSlice from "../selectors/useFetchSlice";
import useProfilChange from "./hooks/useProfilChange";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DarkMode from "../components/darkMode/DarkMode";
import Menu from "../components/accountClient/menu";

const AccountClient = () => {
  const clientIdForDevelopment = "65bc8c5b7f890edc1f63182e";
  const dataClient = useSelector((state) => state?.customer?.data?.client);

  const [isEditing, setIsEditing] = useState(false);
  const [isModified, setIsModified] = useState(false);

  const { handleChangeProfilSave } = useProfilChange(isModified);

  const handleChangeProfilEdit = () => {
    setIsEditing(true);
  };
  useFetchSlice("customer", clientIdForDevelopment);
  useFetchSlice("product");
  useFetchSlice("material");
  useFetchSlice("collection")
  useFetchSlice("tag")
  useFetchSlice("category")

  return (
    <div className="user-profile-container" data-testid="account-dashboard">
      <InfoClient
        dataClient={dataClient}
        handleChangeProfilSave={handleChangeProfilSave}
        isEditing={isEditing}
        handleChangeProfilEdit={handleChangeProfilEdit}
        clientId={clientIdForDevelopment}
        setIsModified={setIsModified}
      />
      <Menu />
      <div className="darkMode">
        <DarkMode />
      </div>
      <ToastContainer autoClose={2500} />
    </div>
  );
};

export default AccountClient;
