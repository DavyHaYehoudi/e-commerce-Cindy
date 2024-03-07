import React from "react";

const Options = ({ handleCheckboxChange, checkedItems }) => {
  const options = [
    "Avoir",
    "Remboursement",
    "Echange",
    "Numéro de suivi",
    "Note",
  ];

  return (
    <div className="filterBlock-content-subBlock">
      <p className="underline">CONTIENT :</p>
      {options.map((option) => (
        <div key={option}>
          <input
            type="checkbox"
            id={option}
            name={option}
            onChange={handleCheckboxChange}
            checked={checkedItems[option] || false}
          />
          <label htmlFor={option}>{option}</label>
        </div>
      ))}
    </div>
  );
};

export default Options;
