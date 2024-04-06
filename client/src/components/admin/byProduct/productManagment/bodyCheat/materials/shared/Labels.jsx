import React from "react";

const Labels = ({ handleNewCheckboxChange, handlePromoCheckboxChange }) => {
  return (
    <div className="labels">
      <div className="labels-content">
        <div className="block">
          <input
            type="checkbox"
            id="new-checkbox"
            onChange={handleNewCheckboxChange}
          />
          <label htmlFor="new-checkbox">Nouveau </label>
        </div>
        <div className="block">
          <input
            type="checkbox"
            id="promo-checkbox"
            onChange={handlePromoCheckboxChange}
          />
          <label htmlFor="promo-checkbox">Promotion </label>
        </div>
      </div>
    </div>
  );
};

export default Labels;
