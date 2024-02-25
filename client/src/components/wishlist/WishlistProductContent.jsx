import React from "react";
import { Link } from "react-router-dom";
import AddToCartButton from "../../shared/AddToCartButton";
import { useSelector } from "react-redux";
import { getProductProperties } from "../../selectors/product";
import { getMaterialProperty } from "../../helpers/constants/materials";
import { formatPrice } from "../../helpers/utils/prices";

const WishlistProductContent = ({ product }) => {
  const productStore = useSelector((state) => state?.product?.data);

  const handleAddToCart = (productsId) => {
    console.log(`Ajouter au panier : ${productsId}`);
  };
  return (
    <div className="modal-product-content">
      <div
        className="modal-product-image info-tooltip"
        aria-label="Revenir à l'article"
      >
        <Link to={`/orderProducts/${product.productsId}`}>
          <img
            src={`/photos/${getProductProperties(product.productsId, productStore).image}`}
            alt={getProductProperties(product.productsId, productStore).name}
            width="100px"
            height="150px"
          />
        </Link>
      </div>

      <div className="modal-product-details">
        <h3>{getProductProperties(product.productsId, productStore).name}</h3>
        <p>{getMaterialProperty(product.material).name}</p>
        <p className="price">
          {formatPrice(
            getProductProperties(product.productsId, productStore)?.pricing?.currentPrice
          )}
        </p>
        <div className="modal-product-actions">
          <AddToCartButton
            className="btn"
            onClick={() => handleAddToCart(product.productsId)}
            buttonText="Ajouter au panier"
          />
        </div>
      </div>
    </div>
  );
};

export default WishlistProductContent;
