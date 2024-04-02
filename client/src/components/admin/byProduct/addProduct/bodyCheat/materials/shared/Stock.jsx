import React from "react";

const Stock = ({ material, handleStockChange, stock }) => {
  return (
    <div className="block">
      <label htmlFor={`stockInput-${material?._id}`}>Stock :</label>
      <input
        type="number"
        className="account-input"
        id={`stockInput-${material?._id}`}
        value={stock}
        onChange={handleStockChange}
      />
    </div>
  );
};

export default Stock;
