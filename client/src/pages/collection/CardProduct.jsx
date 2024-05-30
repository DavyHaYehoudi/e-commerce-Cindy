import React from "react";
import useFirebaseImage from "./hooks/useFirebaseImage";
import { formatPrice } from "../../helpers/utils/prices";
import { Link } from "react-router-dom";

const CardProduct = ({ product, material }) => {
  const { imageUrl, loading, error } = useFirebaseImage(material?.main_image);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Erreur de chargement de l'image</div>;
  }
  const handleAddToCart = () => {};

  return (
    <div className="card-product">
      <Link to={`/master-product/${product?._id}`}>
        <div className="img-container">
          <img src={imageUrl} alt={product?.name} />
        </div>
        <div className="card-info">
          <h4>{product?.name}</h4>
          <p className="manufacture">ATELIER NORALYA</p>
          <p>{formatPrice(material?.pricing?.currentPrice)} </p>
        </div>
      </Link>
      <div className="card-button">
        <button className="add-cart-button btn" onClick={handleAddToCart}>
          Ajouter au panier
        </button>
      </div>
    </div>
  );
};

export default CardProduct;
