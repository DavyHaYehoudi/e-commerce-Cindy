import React from "react";

const MaterialName = ({ material, handleCheckboxChange }) => {
  return (
    <div>
      <input
        type="checkbox"
        id={`materialsCheckbox-${material?._id}`}
        onChange={handleCheckboxChange}
      />
      <label htmlFor={`materialsCheckbox-${material?._id}`}>
        <span>{material?.name} </span>
      </label>
      <span
        style={{
          display: "inline-block",
          width: "20px",
          height: "20px",
          backgroundColor: material?.value,
          marginLeft: "10px",
        }}
      ></span>
    </div>
  );
};

export default MaterialName;
