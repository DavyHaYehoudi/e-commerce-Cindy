import React from "react";
import { orderStep } from "../../../../../constants/orderStep";

const Steps = ({ handleCheckboxChange, checkedItems }) => {
  const steps = orderStep;
  const options = [
    { name: "Avoir", label: "credit" },
    { name: "Remboursement", label: "refund" },
    { name: "Echange", label: "exchange" },
    { name: "Numéro de suivi", label: "trackingNumber" },
    { name: "Note", label: "note" },
  ];
  const criteria = [...steps, ...options];
  return (
    <div className="filterBlock-content-subBlock">
      <p className="underline">PAR OPTIONS :</p>
      {criteria.map(({ name }) => (
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

export default Steps;
