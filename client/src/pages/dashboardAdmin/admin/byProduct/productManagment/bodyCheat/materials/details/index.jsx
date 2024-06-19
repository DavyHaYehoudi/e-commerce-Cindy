import React, { useState } from "react";
import LabelsDetails from "../shared/LabelsDetails";
import Switch from "../shared/Switch";

const MaterialsRowDetails = ({
  material,
  newDate,
  handleNewDateChange,
  promo,
  handlePromoChange,
  mainImage,
  handleMainImageChange,
  fileInputId,
  errorMessage,
  loading,
  handleDeleteImage,
  currentProductId,
  materialActive,
  handleSwitchChange,
  currentAction,
}) => {
  const [isNewChecked, setIsNewChecked] = useState(!!newDate);
  const [isPromoChecked, setIsPromoChecked] = useState(!!promo?.startDate);

  //Checkbox NOUVEAU
  const handleNewCheckboxChange = (e) => {
    const isNewChecked = e.target.checked;
    setIsNewChecked(isNewChecked);
  };

  //Checkbox PROMOTION
  const handlePromoCheckboxChange = () => {
    setIsPromoChecked(!isPromoChecked);
  };

  return (
    <div className="materials-details">
      {currentAction !== "create" && (
        <div className="switch-product-btn">
          {materialActive ? <p className="actived">Activé</p> : <p>Désactivé</p>}
          <Switch checked={materialActive} onChange={handleSwitchChange} />
        </div>
      )}
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
