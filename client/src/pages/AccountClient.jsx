import React, { useState } from "react";
import InfoClient from "../components/accountClient/info";
import { useSelector } from "react-redux";
import useFetchSlice from "../selectors/useFetchSlice";
import useProfilChange from "./hooks/useProfilChange";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DarkMode from "../components/darkMode/DarkMode";
import Menu from "../components/accountClient/menu";
import { IoMdPricetag } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { MdCardGiftcard } from "react-icons/md";
import Giftcards from "../components/accountClient/menu/Giftcards";

const AccountClient = () => {
  const clientIdForDevelopment = "65bc8c5b7f890edc1f63182e";
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
  useFetchSlice("customer", clientIdForDevelopment);
  useFetchSlice("product");
  useFetchSlice("material");
  useFetchSlice("collection");
  useFetchSlice("tag");
  useFetchSlice("category");

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
          clientId={clientIdForDevelopment}
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
