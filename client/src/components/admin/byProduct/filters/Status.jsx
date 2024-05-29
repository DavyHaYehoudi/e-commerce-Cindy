import React from "react";

const Status = ({ handleCheckboxChange, checkedItems }) => {
  const options = [
    { name: "En promotion", label: "promotion" },
    { name: "Nouveau", label: "untilNew" },
    { name: "Suspendu", label: "pending" },
  ];
  return (
    <div className="filterBlock-content-subBlock">
      <p className="underline">PAR STATUTS :</p>
      {options &&
        options.map(({ name }) => (
          <div key={name}>
            <input
              type="checkbox"
              id={name}
              name={name}
              onChange={handleCheckboxChange}
              checked={checkedItems[name] || false}
            />
            <label htmlFor={name}>{name}</label>
          </div>
        ))}
    </div>
  );
};

export default Status;
