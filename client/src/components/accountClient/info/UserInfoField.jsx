import React from "react";

const UserInfoField = ({
  label,
  name,
  value,
  isEditing,
  handleInputChange,
  required,
}) => {
  const handleChange = (event) => {
    handleInputChange(event, name);
  };
  return (
    <p>
      <b>
        <span className="dotted label">
          {label}{" "}:
          {required ? <span className="asterix"> * </span> : ""}
        </span>{" "}
        
      </b>{" "}
      {isEditing ? (
        <input
          type="search"
          name={name}
          className="account-input"
          value={value}
          onChange={handleChange}
        />
      ) : (
        value
      )}
    </p>
  );
};

export default UserInfoField;
