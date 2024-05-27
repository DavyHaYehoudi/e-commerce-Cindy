import React from "react";
import useFirebaseImage from "./hooks/useFirebaseImage";

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
        <p>{material?.pricing?.currentPrice} </p>
      </div>
      <button>Ajouter au panier</button>
    </div>
  );
};

export default CardProduct;
