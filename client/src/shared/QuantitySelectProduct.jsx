import React from "react";
import useQuantitySelectProduct from "./hooks/useQuantitySelectProduct";

const QuantitySelectProduct = ({ productId, materialId }) => {
  const { loading, quantity, handleChangeValue, stockMaxProduct } =
    useQuantitySelectProduct(productId, materialId);
  return (
    <div className="quantity-select">
      {loading ? (
        "..."
      ) : (
        <input
          type="number"
          value={quantity}
          min={1}
          max={stockMaxProduct}
          onChange={(e) => handleChangeValue(parseInt(e.target.value))}
        />
      )}
    </div>
  );
};

export default QuantitySelectProduct;
