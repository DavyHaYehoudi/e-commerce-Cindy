import React from "react";
import InfoClient from "../../components/accountClient/info";
import useAccountClient from "./hooks/useAccountClient";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Menu from "../../components/accountClient/menu";
import { IoMdPricetag } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { MdCardGiftcard } from "react-icons/md";
import Giftcards from "../../components/accountClient/menu/Giftcards";

const AccountClient = () => {
  const {
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
  } = useAccountClient();
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
