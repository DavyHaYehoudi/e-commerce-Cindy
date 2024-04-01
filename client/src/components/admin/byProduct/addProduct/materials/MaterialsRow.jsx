import React from "react";
import MaterialsRowDetails from "./details";
import useMaterialsRowFunctions from "./hooks/useMaterialsRowFunctions";

const MaterialsRow = ({ material, addMaterialData }) => {
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
      } = useMaterialsRowFunctions(material, addMaterialData);
  return (
    <>
      <div className="materials-row">
        <input
          type="checkbox"
          id={`materialsCheckbox-${material._id}`}
          onChange={handleCheckboxChange}
        />
        <label htmlFor={`materialsCheckbox-${material._id}`}>
          <span>{material?.name} </span>
        </label>
        <span
          style={{
            display: "inline-block",
            width: "20px",
            height: "20px",
            backgroundColor: material?.value,
            marginLeft: "10px",
          }}
        ></span>
        <div className="details-wrapper">
          <div className="block">
            <label htmlFor={`stockInput-${material._id}`}>Stock :</label>
            <input
              type="number"
              className="account-input"
              id={`stockInput-${material._id}`}
              value={stock}
              onChange={handleStockChange}
            />
          </div>
          <div className="block">
            <label htmlFor={`currentPriceInput-${material._id}`}>
              Prix en cours (€) :
            </label>
            <input
              type="number"
              className="account-input"
              id={`currentPriceInput-${material._id}`}
              value={pricing?.currentPrice}
              onChange={(e) => handlePricingChange(e, "currentPrice")}
            />
          </div>
          <div className="block">
            <label htmlFor={`previousPriceInput-${material._id}`}>
              Prix ancien (€) :
            </label>
            <input
              type="number"
              className="account-input"
              id={`previousPriceInput-${material._id}`}
              value={pricing?.oldPrice}
              onChange={(e) => handlePricingChange(e, "oldPrice")}
            />
          </div>
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
        />
      )}
    </>
  );
};

export default MaterialsRow;
