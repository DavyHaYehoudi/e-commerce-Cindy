import React from "react";
import { orderStep } from "../../../../../constants/orderStep";

const Steps = ({ handleCheckboxChange, checkedItems }) => {
  const steps = orderStep;
  return (
    <div className="filterBlock-content-subBlock">
      <p className="underline">ETAPES :</p>
      {steps.map(({ id,name }) => (
        <div key={id}>
          <input
            type="checkbox"
            id={id}
            name={id}
            onChange={handleCheckboxChange}
            checked={checkedItems[id] || false}
          />
          <label htmlFor={id}>{name}</label>
        </div>
      ))}
    </div>
  );
};

export default Steps;
