import React from "react";
import { Link } from "react-router-dom";
import AddToCartButton from "../../shared/AddToCartButton";
import { useSelector } from "react-redux";
import { getProductProperties } from "../../selectors/product";
import { getMaterialProperty } from "../../helpers/constants/materials";
import { formatPrice } from "../../helpers/prices";

const WishlistProductContent = ({ product }) => {
  const state = useSelector((state) => state.product);

  const handleAddToCart = (productId) => {
    console.log(`Ajouter au panier : ${productId}`);
  };
  return (
    <div className="modal-product-content">
      <div
        className="modal-product-image info-tooltip"
        aria-label="Revenir à l'article"
      >
        <Link to={`/products/${product.productId}`}>
          <img
            src={getProductProperties(product.productId, state).image}
            alt={getProductProperties(product.productId, state).name}
            width="100px"
            height="150px"
          />
        </Link>
      </div>

      <div className="modal-product-details">
        <h3>{getProductProperties(product.productId, state).name}</h3>
        <p>{getMaterialProperty(product.material).name}</p>
        <p className="price">
          {formatPrice(
            getProductProperties(product.productId, state).pricing.currentPrice
          )}
        </p>
        <div className="modal-product-actions">
          <AddToCartButton
            className="btn"
            onClick={() => handleAddToCart(product.productId)}
            buttonText="Ajouter au panier"
          />
        </div>
      </div>
    </div>
  );
};

export default WishlistProductContent;
