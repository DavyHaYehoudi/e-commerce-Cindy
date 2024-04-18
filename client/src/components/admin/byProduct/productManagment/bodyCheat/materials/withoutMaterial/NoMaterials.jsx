import React, { useState } from "react";
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
    loading,
    handleDeleteImage,
    productActive,
    handleSwitchChange,
  } = useMaterials({
    currentAction,
    currentProductId,
    isWithMaterial,
    addMainImageToStorage,
  });

  return (
    <div className="noMaterials">
      <div className="switch-materials-btn">
        {productActive ? <p className="actived">Activé</p> : <p>Désactivé</p>}
        <Switch checked={productActive} onChange={handleSwitchChange} />
      </div>
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
