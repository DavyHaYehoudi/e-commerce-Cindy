import React, { useState } from "react";
import Stock from "../shared/Stock";
import CurrentPrice from "../shared/CurrentPrice";
import OldPrice from "../shared/OldPrice";
import LabelsDetails from "../shared/LabelsDetails";
import useMaterials from "../hooks/useMaterials";

const NoMaterials = ({ addMaterialData }) => {
  const [isNewChecked, setIsNewChecked] = useState(false);
  const [isPromoChecked, setIsPromoChecked] = useState(false);

  //Réinitialiser checkbox NOUVEAU
  const handleNewCheckboxChange = (e) => {
    const isNewChecked = e.target.checked;
    setIsNewChecked(isNewChecked);
    if (!isNewChecked) {
      setNewDate("");
    }
  };

  //Réinitialiser checkbox PROMOTION
  const handlePromoCheckboxChange = (e) => {
    const isPromoChecked = e.target.checked;
    setIsPromoChecked(isPromoChecked);
    if (!isPromoChecked) {
      setPromo({ amount: 0, startDate: "", endDate: "" });
    }
  };

  const {
    stock,
    pricing,
    newDate,
    setNewDate,
    promo,
    setPromo,
    mainImage,
    handleStockChange,
    handleNewDateChange,
    handlePricingChange,
    handlePromoChange,
    handleMainImageChange,
    errorMessage,
  } = useMaterials(null, addMaterialData);
  return (
    <div className="noMaterials">
      <div className="details-wrapper">
        <Stock stock={stock} handleStockChange={handleStockChange} />
        <CurrentPrice
          pricing={pricing}
          handlePricingChange={handlePricingChange}
        />
        <OldPrice pricing={pricing} handlePricingChange={handlePricingChange} />
      </div>
      <LabelsDetails
        handleNewCheckboxChange={handleNewCheckboxChange}
        handlePromoCheckboxChange={handlePromoCheckboxChange}
        isNewChecked={isNewChecked}
        isPromoChecked={isPromoChecked}
        newDate={newDate}
        setNewDate={setNewDate}
        handleNewDateChange={handleNewDateChange}
        promo={promo}
        setPromo={setPromo}
        handlePromoChange={handlePromoChange}
        mainImage={mainImage}
        handleMainImageChange={handleMainImageChange}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default NoMaterials;
