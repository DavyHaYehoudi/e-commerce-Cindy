import React from "react";
import UserInfoField from "./UserInfoField";

const ShippingAddress = ({
  errorMessages,
  fields,
  handleInputChange,
  isEditing,
}) => {
  return (
    <div className="card">
      <h3>Adresse de livraison</h3>
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
    </div>
  );
};

export default ShippingAddress;
