import React from "react";
import useInfoClient from "./hooks/useInfoClient";
import ProfilClient from "./ProfilClient";
import ShippingAddress from "./ShippingAddress";
import BillingAddress from "./BillingAddress";

const InfoClient = ({
  dataClient,
  handleChangeProfilSave,
  isEditing,
  handleChangeProfilEdit,
  clientId,
  setIsModified,
}) => {
  const {
    profileFields,
    shippingFields,
    billingFields,
    handleInputChange,
    errorMessages,
    handleSaveChanges,
  } = useInfoClient(
    dataClient,
    setIsModified,
    handleChangeProfilSave,
    clientId
  );

  return (
    <div className="user-info-account">
      <div className="user-info-account-container">
        <ProfilClient
          errorMessages={errorMessages}
          fields={profileFields}
          handleInputChange={handleInputChange}
          isEditing={isEditing}
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

      {isEditing ? (
        <button className="btn" onClick={handleSaveChanges}>
          Enregistrer les modifications
        </button>
      ) : (
        <button className="btn" onClick={handleChangeProfilEdit}>
          Modifier les Informations
        </button>
      )}
    </div>
  );
};

export default InfoClient;
