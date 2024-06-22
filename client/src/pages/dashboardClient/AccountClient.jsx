import React from "react";
import InfoClient from "./accountClient/info";
import useAccountClient from "./hooks/useAccountClient";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Menu from "./accountClient/menu";
import { IoMdPricetag } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { MdCardGiftcard } from "react-icons/md";
import Giftcards from "./accountClient/menu/Giftcards";
import { MdLabel } from "react-icons/md";
import Credits from "./accountClient/menu/Credits";
import CartOffCanvas from "../MasterProduct/cartAccess";
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
      <div className="animated-container">
        <div className="user-profile-menu">
          <div className="user-profile-menu-wrapper">
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
                selectedTab === "Cartes cadeaux" ? "selected" : ""
              }`}
              onClick={() => handleTabChange("Cartes cadeaux")}
            >
              <span>
                <MdCardGiftcard />
                Cartes cadeaux
              </span>
            </button>
            <button
              className={`account-btn ${
                selectedTab === "Avoirs" ? "selected" : ""
              }`}
              onClick={() => handleTabChange("Avoirs")}
            >
              <span>
                <MdLabel />
                Avoirs
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
        {selectedTab === "Cartes cadeaux" && <Giftcards />}
        {selectedTab === "Avoirs" && <Credits />}
      </div>
      <CartOffCanvas />
      <ToastContainer autoClose={2500} />
    </div>
  );
};

export default AccountClient;
