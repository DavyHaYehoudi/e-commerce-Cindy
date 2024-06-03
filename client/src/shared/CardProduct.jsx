import React from "react";
import useFirebaseImage from "./hooks/useFirebaseImage";
import { formatPrice } from "../helpers/utils/prices";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import isCurrent from "../helpers/utils/isCurrentDate";
import FavoriteButton from "./FavoriteButton";

const CardProduct = ({ product, material }) => {
  const materialsStore = useSelector((state) => state?.material?.data);
  const { imageUrl } = useFirebaseImage(material?.main_image);

  //Utile pour les produits suggérés en bas des pages
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleAddToCart = () => {};
  const materialName =
    materialsStore.find((mat) => mat?._id === material._id)?.name || "";
  return (
    <div className="card-product">
      <Link
        to={`/master-product/${product?._id}`}
        state={{ materialId: material?._id }}
        onClick={scrollToTop}
      >
        <div className="img-container">
          <img src={imageUrl} alt={product?.name} />
        </div>
        <div className="card-info">
          <h4>{product?.name}</h4>
          <p>{materialName} </p>
          <p className="manufacture">ATELIER NORALYA</p>
          {isCurrent(material?.promotion?.endDate) && (
            <small className="promo-badge">EN PROMOTION</small>
          )}
          <p>{formatPrice(material?.pricing?.currentPrice)} </p>
        </div>
      </Link>
      <div className="card-button">
        <button className="add-cart-button btn" onClick={handleAddToCart}>
          Ajouter au panier
        </button>
      </div>
      <div className="like-card">
        <FavoriteButton productId={product?._id} materialId={material?._id} />
      </div>
    </div>
  );
};

export default CardProduct;
