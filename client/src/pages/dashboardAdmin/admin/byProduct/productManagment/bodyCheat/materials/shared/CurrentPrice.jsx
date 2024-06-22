import React from "react";

const CurrentPrice = ({ material, handlePricingChange, pricing }) => {
  return (
    <div className="block">
      <label htmlFor={`currentPriceInput-${material?._id}`}>
        Prix en cours<span className="asterix">*</span> (€) :
      </label>
      <input
        type="number"
        className="account-input"
        id={`currentPriceInput-${material?._id}`}
        value={pricing?.currentPrice || ""}
        min={0}
        onChange={(e) => handlePricingChange(e, "currentPrice")}
      />
    </div>
  );
};

export default CurrentPrice;
