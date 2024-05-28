import React from "react";
import useFirebaseImage from "./hooks/useFirebaseImage";
import { formatPrice } from "../../helpers/utils/prices";

const CardProduct = ({ product, material }) => {
  const { imageUrl, loading, error } = useFirebaseImage(material?.main_image);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Erreur de chargement de l'image</div>;
  }

  return (
    <div className="card-product">
      <div className="img-container">
        <img src={imageUrl} alt={product?.name} />
      </div>
      <div className="card-info">
        <h4>{product?.name}</h4>
        <p className="manufacture">ATELIER NORALYA</p>
        <p>{formatPrice(material?.pricing?.currentPrice)} </p>
      </div>
      <div className="card-button">
        <button className="add-cart-button btn">Ajouter au panier</button>
      </div>
    </div>
  );
};

export default CardProduct;
