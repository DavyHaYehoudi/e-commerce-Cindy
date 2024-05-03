import React, { useState } from "react";
import InfoClient from "../components/accountClient/info";
import { useSelector } from "react-redux";
import useFetchSliceCustomer from "../selectors/useFetchSliceCustomer";
import useProfilChange from "./hooks/useProfilChange";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DarkMode from "../components/darkMode/DarkMode";
import Menu from "../components/accountClient/menu";
import { IoMdPricetag } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { MdCardGiftcard } from "react-icons/md";
import Giftcards from "../components/accountClient/menu/Giftcards";
import useTokenExpiration from "./authentication/hooks/useTokenExpiration";
import useClientFromToken from "./authentication/hooks/useClientFromToken";

const AccountClient = () => {
  useTokenExpiration();
  const { clientId } = useClientFromToken() || "";
  console.log('clientId:', clientId)
  useFetchSliceCustomer(clientId);

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
  } = useProfilChange();

  const handleChangeProfilEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="user-profile-container" data-testid="account-dashboard">
      <div className="user-profile-menu">
        <div>
          <button
            className={`account-btn ${
              selectedTab === "Compte" ? "selected" : ""
            }`}
            onClick={() => handleTabChange("Compte")}
          >
            <span>
              <FaUser />
              Compte
            </span>
          </button>
          <button
            className={`account-btn ${
              selectedTab === "Commandes" ? "selected" : ""
            }`}
            onClick={() => handleTabChange("Commandes")}
          >
            <span>
              <IoMdPricetag />
              Commandes
            </span>
          </button>
          <button
            className={`account-btn ${
              selectedTab === "Cartes-cadeaux" ? "selected" : ""
            }`}
            onClick={() => handleTabChange("Cartes-cadeaux")}
          >
            <span>
              <MdCardGiftcard />
              Cartes-cadeaux
            </span>
          </button>
        </div>
        <div className="darkMode">
          <DarkMode />
        </div>
      </div>

      {selectedTab === "Compte" && (
        <InfoClient
          dataClient={dataClient}
          handleChangeProfilSave={handleChangeProfilSave}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          handleChangeProfilEdit={handleChangeProfilEdit}
          clientId={clientId}
          setIsModified={setIsModified}
          isModified={isModified}
        />
      )}
      {selectedTab === "Commandes" && <Menu />}
      {selectedTab === "Cartes-cadeaux" && <Giftcards />}

      <ToastContainer autoClose={2500} />
    </div>
  );
};

export default AccountClient;
