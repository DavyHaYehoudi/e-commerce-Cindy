import React, { useState } from "react";
import MaterialsRowDetails from "./details";

const MaterialsRow = ({ material, addMaterialData }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [stock, setStock] = useState(0);
  const [currentPrice, setCurrentPrice] = useState("");
  const [previousPrice, setPreviousPrice] = useState("");

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
    if (e.target.checked) {
      const newMaterialData = {
        _id: material._id,
        pricing: {
          currentPrice: currentPrice,
          oldPrice: previousPrice,
        },
        promotion: {
          amount: 0,
          startDate: "",
          endDate: "",
        },
        main_image: "",
        untilNew: "",
        stock: stock,
      };

      addMaterialData(newMaterialData,material._id);
    }
  };

  const handleStockChange = (e) => {
    setStock(e.target.value);
  };

  const handleCurrentPriceChange = (e) => {
    setCurrentPrice(e.target.value);
  };

  const handlePreviousPriceChange = (e) => {
    setPreviousPrice(e.target.value);
  };

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
              Prix en cours :
            </label>
            <input
              type="number"
              className="account-input"
              id={`currentPriceInput-${material._id}`} 
              value={currentPrice}
              onChange={handleCurrentPriceChange}
            />
            {" €"}
          </div>
          <div className="block">
            <label htmlFor={`previousPriceInput-${material._id}`}>
              Prix ancien :
            </label>
            <input
              type="number"
              className="account-input"
              id={`previousPriceInput-${material._id}`} 
              value={previousPrice}
              onChange={handlePreviousPriceChange}
            />
            {" €"}
          </div>
        </div>
      </div>
      {isChecked && <MaterialsRowDetails material={material} addMaterialData={addMaterialData} />}
    </>
  );
};

export default MaterialsRow;
