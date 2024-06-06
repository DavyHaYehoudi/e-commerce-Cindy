import React from "react";
import useQuantitySelectProduct from "./hooks/useQuantitySelectProduct";

const QuantitySelectProduct = ({ productId, materialId }) => {
  const { loading, quantity, handleChangeValue } = useQuantitySelectProduct(
    productId,
    materialId
  ); 

  return (
    <div className="quantity-select">
      {loading ? (
        "..."
      ) : (
        <input
          type="number"
          value={quantity}
          min={1}
          onChange={(e) => handleChangeValue(parseInt(e.target.value))}
        />
      )}
    </div>
  );
};

export default QuantitySelectProduct;
