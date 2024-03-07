import React from "react";
import { orderStep } from "../../../../../constants/orderStep";

const Steps = ({ handleCheckboxChange, checkedItems }) => {
  const steps = orderStep;
  return (
    <div className="filterBlock-content-subBlock">
      <p className="underline">ETAPES :</p>
      {steps.map(({ name }) => (
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
