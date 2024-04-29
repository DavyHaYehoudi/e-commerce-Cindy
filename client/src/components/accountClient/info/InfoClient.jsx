import React from "react";
import UserInfoField from "./UserInfoField";
import useInfoClient from "./hooks/useInfoClient";

const InfoClient = ({
  dataClient,
  handleChangeProfilSave,
  isEditing,
  handleChangeProfilEdit,
  clientId,
  setIsModified,
}) => {
  const { fields, handleInputChange, errorMessages } = useInfoClient(
    dataClient,
    setIsModified
  );

  const handleSaveChanges = () => {
    const hasErrors = Object.values(errorMessages).some(
      (message) => message !== null
    );
    if (!hasErrors) {
      handleChangeProfilSave(dataClient, clientId);
    }
  };

  return (
    <div className="user-info-account">
      <h2>Informations</h2>
      {errorMessages && (
        <small className="error-message">
          {Object.values(errorMessages).map((message, index) => (
            <span key={index}>
              {message}
              <br />
            </span>
          ))}
        </small>
      )}
      {fields.map((field, index) => (
        <UserInfoField
          key={index}
          label={field.label}
          name={field.name}
          value={field.value}
          isEditing={isEditing}
          handleInputChange={handleInputChange(
            field.name,
            field.nestedFieldName,
            field.label
          )}
          required={field.required}
        />
      ))}
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
