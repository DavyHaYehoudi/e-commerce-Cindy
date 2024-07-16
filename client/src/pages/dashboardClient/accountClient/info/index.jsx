import React from "react";
import useInfoClient from "./hooks/useInfoClient";
import ProfilClient from "./ProfilClient";
import ShippingAddress from "./ShippingAddress";
import BillingAddress from "./BillingAddress";
import useProfilClientImage from "./hooks/useProfilClientImage";
import { MdEdit } from "react-icons/md";

const InfoClient = ({
  dataClient,
  handleChangeProfilSave,
  isEditing,
  setIsEditing,
  handleChangeProfilEdit,
  clientId,
  setIsModified,
  isModified,
}) => {
  const {
    mainImage,
    handleMainImageChange,
    handleDeleteImage,
    loading,
    addAvatarToStorage,
    setAddAvatarToStorage,
    removeAvatarToStorage,
    setRemoveAvatarToStorage,
  } =
    useProfilClientImage({
      initAvatar: dataClient?.avatar,
      setIsModified,
      setIsEditing,
    }) || {};
  const {
    profileFields,
    shippingFields,
    billingFields,
    handleInputChange,
    errorMessages,
    hasErrors,
    handleSaveChanges,
    avatarStore,
  } = useInfoClient(
    dataClient,
    setIsModified,
    handleChangeProfilSave,
    clientId,
    addAvatarToStorage,
    setAddAvatarToStorage,
    removeAvatarToStorage,
    setRemoveAvatarToStorage
  );

  return (
    <div className="user-info-account">
      <div className="action-wrapper">
        {isEditing ? (
          <button
            className={`btn ${isModified && !hasErrors ? "modified" : ""}`}
            disabled={hasErrors || !avatarStore}
            onClick={handleSaveChanges}
          >
            Enregistrer les modifications
          </button>
        ) : (
          <button className="btn" onClick={handleChangeProfilEdit}>
            Modifier les Informations <MdEdit />
          </button>
        )}
      </div>
      <div className="user-info-account-container">
        <ProfilClient
          errorMessages={errorMessages}
          fields={profileFields}
          handleInputChange={handleInputChange}
          isEditing={isEditing}
          mainImage={mainImage}
          handleMainImageChange={handleMainImageChange}
          handleDeleteImage={handleDeleteImage}
          loading={loading}
        />
        <ShippingAddress
          errorMessages={errorMessages}
          fields={shippingFields}
          handleInputChange={handleInputChange}
          isEditing={isEditing}
        />
        <BillingAddress
          errorMessages={errorMessages}
          fields={billingFields}
          handleInputChange={handleInputChange}
          isEditing={isEditing}
        />
      </div>
    </div>
  );
};

export default InfoClient;
