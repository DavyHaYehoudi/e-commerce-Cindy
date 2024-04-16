// MaterialsRowDetails.js
import React, { useState } from "react";
import LabelsDetails from "../shared/LabelsDetails";

const MaterialsRowDetails = ({
  material,
  newDate,
  setNewDate,
  handleNewDateChange,
  promo,
  setPromo,
  handlePromoChange,
  mainImage,
  handleMainImageChange,
  fileInputId,
  errorMessage,
  loading,
  handleDeleteImage,
  currentProductId,
}) => {
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

  return (
    <div className="materials-details">
      <LabelsDetails
        currentProductId={currentProductId}
        isNewChecked={isNewChecked}
        isPromoChecked={isPromoChecked}
        newDate={newDate}
        handleNewCheckboxChange={handleNewCheckboxChange}
        handlePromoCheckboxChange={handlePromoCheckboxChange}
        handleNewDateChange={handleNewDateChange}
        promo={promo}
        handlePromoChange={handlePromoChange}
        material={material}
        mainImage={mainImage}
        handleMainImageChange={handleMainImageChange}
        fileInputId={fileInputId}
        errorMessage={errorMessage}
        loading={loading}
        handleDeleteImage={handleDeleteImage}
      />
    </div>
  );
};

export default MaterialsRowDetails;
