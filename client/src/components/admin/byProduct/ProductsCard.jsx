import React from "react";
import useImageUrl from "./productManagment/hooks/useImageUrl";

const ProductsCard = ({ product, handleOpenModal }) => {
  const imageUrl = useImageUrl(product?.materials[0]?.main_image);

  return (
    <div className="card" onClick={() => handleOpenModal("edit", product?._id)}>
      <div className="card-wrapper">
        {imageUrl ? (
          <img src={imageUrl} alt={product?.name} />
        ) : (
          <p>Chargement de l'image...</p>
        )}
        <p>{product?.name}</p>
      </div>
    </div>
  );
};

export default ProductsCard;
