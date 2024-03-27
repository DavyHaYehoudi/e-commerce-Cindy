import React from "react";

const ProductsCard = ({ product }) => {
  return (
    <div className="card">
      <div className="card-wrapper">
        <img
          src={`/photos/${product?.materials[0]?.main_image}`}
          alt={product.name}
        />
        <p>{product?.name}</p>
      </div>
    </div>
  );
};

export default ProductsCard;
