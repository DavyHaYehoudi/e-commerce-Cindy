import React from "react";

const Name = ({ fields, handleChangeFields }) => {
  return (
    <div className="name-section">
      <label htmlFor="name">
        Nom<span className="asterix">*</span> :{" "}
      </label>
      <input
        type="search"
        id="name"
        placeholder="Nom du produit"
        value={fields?.name || ""}
        className="account-input"
        onChange={(e) => handleChangeFields(e, "name")}
      />
    </div>
  );
};

export default Name;
