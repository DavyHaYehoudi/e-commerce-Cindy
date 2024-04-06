import React from "react";
import MaterialsRowDetails from "../details";
import MaterialName from "./MaterialName";
import Stock from "../shared/Stock";
import CurrentPrice from "../shared/CurrentPrice";
import OldPrice from "../shared/OldPrice";
import useMaterials from "../hooks/useMaterials";

const MaterialsRow = ({ material, addMaterialData, currentAction,currentProductId }) => {
  // console.log('material:', material)
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
  } = useMaterials({material, addMaterialData, currentAction,currentProductId});
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
          material={material}
          addMaterialData={addMaterialData}
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
        />
      )}
    </>
  );
};

export default MaterialsRow;