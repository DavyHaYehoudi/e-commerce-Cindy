// MaterialsRowDetails.js
import React, { useState } from "react";
import LabelsDetails from "./LabelsDetails";

const MaterialsRowDetails = ({ material, addMaterialData }) => {
  const [isNewChecked, setIsNewChecked] = useState(false);
  const [isPromoChecked, setIsPromoChecked] = useState(false);
  const [newDate, setNewDate] = useState("");
  const [promoStartDate, setPromoStartDate] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0);

  const handleNewCheckboxChange = (e) => {
    setIsNewChecked(e.target.checked);
    if (!e.target.checked) {
      // Reset newDate if unchecked
      setNewDate("");
    }
    updateMaterialData();
  };

  const handlePromoCheckboxChange = (e) => {
    setIsPromoChecked(e.target.checked);
    if (!e.target.checked) {
      // Reset promoStartDate and promoDiscount if unchecked
      setPromoStartDate("");
      setPromoDiscount(0);
    }
    updateMaterialData();
  };

  const handleNewDateChange = (e) => {
    setNewDate(e.target.value);
    updateMaterialData();
  };

  const handlePromoStartDateChange = (e) => {
    setPromoStartDate(e.target.value);
    updateMaterialData();
  };

  const handlePromoDiscountChange = (e) => {
    setPromoDiscount(e.target.value);
    updateMaterialData();
  };

  const updateMaterialData = () => {
    const newMaterialData = {
      promotion: {
        startDate: promoStartDate,
        endDate: "",
        amount: promoDiscount,
      },
      untilNew: newDate,
    };

    addMaterialData(newMaterialData,material._id);
  };

  return (
    <div className="materials-details">
      <LabelsDetails
        isNewChecked={isNewChecked}
        isPromoChecked={isPromoChecked}
        newDate={newDate}
        handleNewCheckboxChange={handleNewCheckboxChange}
        handlePromoCheckboxChange={handlePromoCheckboxChange}
        handleNewDateChange={handleNewDateChange}
        promoStartDate={promoStartDate}
        handlePromoStartDateChange={handlePromoStartDateChange}
        promoDiscount={promoDiscount}
        handlePromoDiscountChange={handlePromoDiscountChange}
        material={material}
      />
    </div>
  );
};

export default MaterialsRowDetails;
