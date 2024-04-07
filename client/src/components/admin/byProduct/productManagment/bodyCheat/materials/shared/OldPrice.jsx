import React from 'react';

const OldPrice = ({material,handlePricingChange,pricing}) => {
    return (
        <div className="block">
        <label htmlFor={`previousPriceInput-${material?._id}`}>
          Prix ancien (€) :
        </label>
        <input
          type="number"
          className="account-input"
          id={`previousPriceInput-${material?._id}`}
          value={pricing?.oldPrice ||0}
          onChange={(e) => handlePricingChange(e, "oldPrice")}
        />
      </div>
    );
};

export default OldPrice;