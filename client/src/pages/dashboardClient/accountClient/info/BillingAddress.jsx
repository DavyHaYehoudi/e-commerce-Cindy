import React from "react";
import UserInfoField from "./UserInfoField";

const BillingAddress = ({
  errorMessages,
  fields,
  handleInputChange,
  isEditing,
}) => {
  return (
    <div className="card">
      <h3>Adresse de facturation</h3>
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

export default BillingAddress;
