import React from "react";
import MaterialsRowDetails from "../details";
import MaterialName from "./MaterialName";
import Stock from "../shared/Stock";
import CurrentPrice from "../shared/CurrentPrice";
import OldPrice from "../shared/OldPrice";
import useMaterials from "../hooks/useMaterials";

const MaterialsRow = ({
  data,
  material,
  currentAction,
  currentProductId,
  isWithMaterial,
  addMainImageToStorage,
}) => {
  // Générer un identifiant unique pour l'input de type fichier
  const fileInputId = `file-upload-${material?._id}`;
  const {
    isChecked,
    stock,
    pricing,
    newDate,
    setNewDate,
    promo,
    setPromo,
    mainImage,
    handleCheckboxChange,
    handleStockChange,
    handleNewDateChange,
    handlePricingChange,
    handlePromoChange,
    handleMainImageChange,
    errorMessage,
    loading,
    handleDeleteImage,
    productActive,
    handleSwitchChange
  } = useMaterials({
    material,
    currentAction,
    currentProductId,
    isWithMaterial,
    addMainImageToStorage,
  });

  return (
    <>
      <div className="materials-row">
        <MaterialName
          material={material}
          handleCheckboxChange={handleCheckboxChange}
        />
        <div className="details-wrapper">
          <Stock
            material={material}
            handleStockChange={handleStockChange}
            stock={stock}
          />
          <CurrentPrice
            material={material}
            handlePricingChange={handlePricingChange}
            pricing={pricing}
          />
          <OldPrice
            material={material}
            handlePricingChange={handlePricingChange}
            pricing={pricing}
          />
        </div>
      </div>
      {isChecked && (
        <MaterialsRowDetails
          data={data}
          currentProductId={currentProductId}
          material={material}
          promo={promo}
          newDate={newDate}
          setNewDate={setNewDate}
          handleNewDateChange={handleNewDateChange}
          handlePromoChange={handlePromoChange}
          setPromo={setPromo}
          mainImage={mainImage}
          handleMainImageChange={handleMainImageChange}
          fileInputId={fileInputId}
          errorMessage={errorMessage}
          loading={loading}
          handleDeleteImage={handleDeleteImage}
          productActive={productActive}
          handleSwitchChange={handleSwitchChange}
        />
      )}
    </>
  );
};

export default MaterialsRow;
