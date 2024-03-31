import React from "react";
import MainImage from "./MainImage";

const LabelsDetails = ({
  isNewChecked,
  newDate,
  handleNewDateChange,
  isPromoChecked,
  promoStartDate,
  handlePromoStartDateChange,
  promoDiscount,
  handlePromoDiscountChange,
  material,
  handleNewCheckboxChange,
  handlePromoCheckboxChange,
}) => {
  return (
    <div className="labels-details">
      <div className="main_image">
        <MainImage material={material} />
      </div>
      <div className="block">
        <input
          type="checkbox"
          id={`new-checkbox-${material._id}`}
          checked={isNewChecked}
          onChange={handleNewCheckboxChange}
        />
        <label htmlFor={`new-checkbox-${material._id}`}>Nouveau</label>
      </div>
      <div className="block">
        <input
          type="checkbox"
          id={`promo-checkbox-${material._id}`}
          checked={isPromoChecked}
          onChange={handlePromoCheckboxChange}
        />
        <label htmlFor={`promo-checkbox-${material._id}`}>Promotion</label>
      </div>
      {isNewChecked && (
        <div>
          <label htmlFor={`new-date-${material._id}`}>
            Nouveau jusqu'au :{" "}
          </label>
          <input
            type="date"
            className="account-input"
            id={`new-date-${material._id}`}
            value={newDate}
            onChange={handleNewDateChange}
          />
        </div>
      )}
      {isPromoChecked && (
        <div className="promotion">
          <div className="block1">
            <label htmlFor={`promo-start-date-${material._id}`}>
              Promotion jusqu'au :{" "}
            </label>
            <input
              type="date"
              className="account-input"
              id={`promo-start-date-${material._id}`}
              value={promoStartDate}
              onChange={handlePromoStartDateChange}
            />
          </div>
          <div className="block2">
            <label htmlFor={`promo-discount-${material._id}`}>Remise ( %) : </label>
            <input
              type="number"
              className="account-input"
              id={`promo-discount-${material._id}`}
              value={promoDiscount}
              onChange={handlePromoDiscountChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LabelsDetails;
