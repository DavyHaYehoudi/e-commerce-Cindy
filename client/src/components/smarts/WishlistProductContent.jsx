import React from "react";
import { Link } from "react-router-dom";

const WishlistProductContent = ({ product }) => {
  const handleAddToCart = (productId) => {
    console.log(`Ajouter au panier : ${productId}`);
  };
  return (
    <div className="modal-product-content">
      <div
        className="modal-product-image info-tooltip"
        aria-label="Revenir à l'article"
      >
        <Link to={`/products/${product.id}`} >
          <img
            src={product.image}
            alt={product.title}
            width="100px"
            height="150px"
          />
        </Link>
      </div>

      <div className="modal-product-details">
        <h3>{product.title}</h3>
        <p>{product.material}</p>
        <p className="price" >{product.price}</p>
        <div className="modal-product-actions">
          <button className="btn" onClick={() => handleAddToCart(product.id)}>
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistProductContent;
