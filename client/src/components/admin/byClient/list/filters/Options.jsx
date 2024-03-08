import React from "react";

const Options = ({ handleCheckboxChange, checkedItems }) => {
  const options = [
    { name: "credit", label: "Avoir" },
    { name: "refund", label: "Remboursement" },
    { name: "exchange", label: "Echange" },
    { name: "trackingNumber", label: "Numéro de suivi" },
    { name: "note", label: "Note" },
  ];

  return (
    <div className="filterBlock-content-subBlock">
      <p className="underline">CONTIENT :</p>
      {options.map(({ name, label }) => (
        <div key={name}>
          <input
            type="checkbox"
            id={name}
            name={name}
            onChange={handleCheckboxChange}
            checked={checkedItems[name] || false}
          />
          <label htmlFor={name}>{label}</label>
        </div>
      ))}
    </div>
  );
};

export default Options;
