import React, { useEffect, useState } from "react";
import Stock from "../shared/Stock";
import CurrentPrice from "../shared/CurrentPrice";
import OldPrice from "../shared/OldPrice";
import LabelsDetails from "../shared/LabelsDetails";
import useMaterials from "../hooks/useMaterials";
import Switch from "../shared/Switch";

const NoMaterials = ({
  data,
  addMainImageToStorage,
  currentAction,
  currentProductId,
  isWithMaterial,
}) => {
  const [isNewChecked, setIsNewChecked] = useState(false);
  const [isPromoChecked, setIsPromoChecked] = useState(false);

  //Réinitialiser checkbox NOUVEAU
  const handleNewCheckboxChange = (e) => {
    const isNewChecked = e.target.checked;
    setIsNewChecked(isNewChecked);
  };

  //Réinitialiser checkbox PROMOTION
  const handlePromoCheckboxChange = (e) => {
    const isPromoChecked = e.target.checked;
    setIsPromoChecked(isPromoChecked);
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
    loading,
    handleDeleteImage,
    materialActive,
    handleSwitchChange,
  } = useMaterials({
    currentAction,
    currentProductId,
    isWithMaterial,
    addMainImageToStorage,
  });
  
  useEffect(() => {
    setIsNewChecked(!!newDate);
    setIsPromoChecked(!!promo?.startDate);
  }, [newDate, promo]);

  return (
    <div className="noMaterials">
      {currentAction !== "create" && (
        <div className="switch-product-btn">
          {materialActive ? <p className="actived">Activé</p> : <p>Désactivé</p>}
          <Switch checked={materialActive} onChange={handleSwitchChange} />
        </div>
      )}
      <div className="details-wrapper">
        <Stock stock={stock} handleStockChange={handleStockChange} />
        <CurrentPrice
          pricing={pricing}
          handlePricingChange={handlePricingChange}
        />
        <OldPrice pricing={pricing} handlePricingChange={handlePricingChange} />
      </div>
      <LabelsDetails
        data={data}
        currentProductId={currentProductId}
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
        loading={loading}
        handleDeleteImage={handleDeleteImage}
        addMainImageToStorage={addMainImageToStorage}
      />
    </div>
  );
};

export default NoMaterials;
