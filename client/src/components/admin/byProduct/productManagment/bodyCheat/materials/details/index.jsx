import React, { useEffect, useState } from "react";
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
  productActive,
  handleSwitchChange,
  currentAction,
}) => {
  const [isNewChecked, setIsNewChecked] = useState(false);
  const [isPromoChecked, setIsPromoChecked] = useState(false);
  useEffect(() => {
    setIsNewChecked(!!newDate);
    setIsPromoChecked(!!promo?.startDate);
  }, [newDate, promo]);

  //Checkbox NOUVEAU
  const handleNewCheckboxChange = (e) => {
    const isNewChecked = e.target.checked;
    setIsNewChecked(isNewChecked);
  };

  //Checkbox PROMOTION
  const handlePromoCheckboxChange = (e) => {
    const isPromoChecked = e.target.checked;
    setIsPromoChecked(isPromoChecked);
  };

  return (
    <div className="materials-details">
      {currentAction !== "create" && (
        <div className="switch-materials-btn">
          {productActive ? <p className="actived">Activé</p> : <p>Désactivé</p>}
          <Switch checked={productActive} onChange={handleSwitchChange} />
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
