import React from 'react';

const Description = ({ fields, handleChangeFields }) => {
  return (
    <div className="description-section">
      <label htmlFor="description">Description :{" "} </label>
      <textarea
        id="description"
        className="description-input"
        value={fields.description||""}
        onChange={(e) => handleChangeFields(e, "description")}
      ></textarea>
    </div>
  );
};

export default Description;
