import React from "react";

const Stock = ({ material, handleStockChange, stock }) => {
  return (
    <div className="block">
      <label htmlFor={`stockInput-${material?._id}`}>
        Stock<span className="asterix">*</span> :
      </label>
      <input
        type="number"
        className="account-input"
        id={`stockInput-${material?._id}`}
        value={stock ?? ""}
        min={0}
        onChange={handleStockChange}
      />
    </div>
  );
};

export default Stock;
