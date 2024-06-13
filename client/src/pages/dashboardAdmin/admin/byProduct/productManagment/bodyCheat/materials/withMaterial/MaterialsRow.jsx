import React from "react";
import MaterialsRowDetails from "../details";
import MaterialName from "./MaterialName";
import Stock from "../shared/Stock";
import CurrentPrice from "../shared/CurrentPrice";
import OldPrice from "../shared/OldPrice";
import useMaterials from "../hooks/useMaterials";
import Star from "../shared/Star";

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
    promo,
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
    materialActive,
    handleSwitchChange,
    handleSwitchChangeMaterial,
    isFeaturedMaterial,
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
          <Star
            isFeaturedMaterial={isFeaturedMaterial}
            handleSwitchChangeMaterial={handleSwitchChangeMaterial}
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
          handleNewDateChange={handleNewDateChange}
          handlePromoChange={handlePromoChange}
          mainImage={mainImage}
          handleMainImageChange={handleMainImageChange}
          fileInputId={fileInputId}
          errorMessage={errorMessage}
          loading={loading}
          handleDeleteImage={handleDeleteImage}
          materialActive={materialActive}
          handleSwitchChange={handleSwitchChange}
          currentAction={currentAction}
        />
      )}
    </>
  );
};

export default MaterialsRow;
