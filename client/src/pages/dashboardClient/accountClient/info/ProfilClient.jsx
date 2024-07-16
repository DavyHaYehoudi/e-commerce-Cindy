import React from "react";
import UserInfoField from "./UserInfoField";
import MainImage from "../../../../shared/MainImage";

const ProfilClient = ({
  errorMessages,
  fields,
  handleInputChange,
  isEditing,
  mainImage,
  handleMainImageChange,
  handleDeleteImage,
  loading,
}) => {
  return (
    <div className="card">
      <h3>PROFIL</h3>
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
      <div className="profil-image-client">
        <MainImage
          mainImage={mainImage}
          handleMainImageChange={handleMainImageChange}
          handleDeleteImage={handleDeleteImage}
          loading={loading}
          required={true}
          legend="MON IMAGE DE PROFIL"
        />
      </div>
    </div>
  );
};

export default ProfilClient;
