import React from "react";
import useImageUrl from "./productManagment/hooks/useImageUrl";
import { FaCheckCircle } from "react-icons/fa";
import { FaPauseCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

const ProductsCard = ({ product, handleOpenModal }) => {
  const imageUrl = useImageUrl(product?.materials[0]?.main_image);
  const productsStore = useSelector((state) => state?.product?.data);
  const handleProductActive = () => {
    return productsStore.find((pdt) => pdt._id === product._id)?.isActive;
  };

  return (
    <div className="card" onClick={() => handleOpenModal("edit", product?._id)}>
      <div className={`card-wrapper ${!handleProductActive() ? "notActive" : ""}`}>
        {imageUrl ? (
          <img src={imageUrl} alt={product?.name}  />
        ) : (
          <p>Chargement de l'image...</p>
        )}
        <p>{product?.name}</p>
      </div>
      <p>
        {handleProductActive() ? (
          <span className="icon icon-active">
            {" "}
            <FaCheckCircle />
          </span>
        ) : (
          <span className="icon icon-pending">
            <FaPauseCircle />
          </span>
        )}
      </p>
    </div>
  );
};

export default ProductsCard;
