import React from "react";
import InfoClient from "./accountClient/info";
import useAccountClient from "./hooks/useAccountClient";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Menu from "./accountClient/menu";
import { IoIosAlbums } from "react-icons/io";
import { FaEuroSign } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { MdCardGiftcard } from "react-icons/md";
import Giftcards from "./accountClient/menu/Giftcards";
import Credits from "./accountClient/menu/Credits";
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
    otherOrdersCount,
    deliveredOrdersCount,
    ordersCount,
    giftcardCount,
    creditCount,
  } = useAccountClient();
  return (
    <div className="user-profile-container" data-testid="account-dashboard">
      <div className="animated-container">
        <div className="user-profile-menu">
          <div className="user-profile-menu-wrapper">
            <button
              className={`account-btn ${
                selectedTab === "Commandes" ? "selected" : ""
              }`}
              onClick={() => handleTabChange("Commandes")}
            >
              <span>
                <IoIosAlbums />
                Commandes ({ordersCount})
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
                Cartes cadeaux ({giftcardCount})
              </span>
            </button>
            <button
              className={`account-btn ${
                selectedTab === "Avoirs" ? "selected" : ""
              }`}
              onClick={() => handleTabChange("Avoirs")}
            >
              <span>
                <FaEuroSign />
                Avoirs ({creditCount})
              </span>
            </button>
            <button
              className={`account-btn ${
                selectedTab === "Profil" ? "selected" : ""
              }`}
              onClick={() => handleTabChange("Profil")}
            >
              <span>
                <FaUser />
                Profil
              </span>
            </button>
          </div>
        </div>

        {selectedTab === "Commandes" && (
          <Menu
            otherOrdersCount={otherOrdersCount}
            deliveredOrdersCount={deliveredOrdersCount}
          />
        )}
        {selectedTab === "Cartes cadeaux" && <Giftcards />}
        {selectedTab === "Avoirs" && <Credits />}
        {selectedTab === "Profil" && (
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
      </div>
      <ToastContainer autoClose={2500} />
    </div>
  );
};

export default AccountClient;
