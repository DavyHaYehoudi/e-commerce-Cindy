import React from "react";
import { Link } from "react-router-dom";
import AddToCartButton from "../../shared/AddToCartButton";
import { getProductProperties } from "../../selectors/product";
import { formatPrice } from "../../helpers/utils/prices";
import { getMaterialProperty } from "../../selectors/material";
import useWishlistProductContent from "./hooks/useWishlistProductContent";
import useFirebaseImage from "../../shared/hooks/useFirebaseImage";

const WishlistProductContent = ({ product, handleCloseWishlistModal }) => {
  const {
    productStore,
    collectionStore,
    categoryStore,
    tagStore,
    materialStore,
  } = useWishlistProductContent();

  const productProperties = getProductProperties(
    product?.productsId,
    productStore,
    collectionStore,
    categoryStore,
    tagStore,
    product?.material
  );

  const materialProperty = getMaterialProperty(
    product?.material,
    materialStore
  );
  const { imageUrl } = useFirebaseImage(productProperties?.main_image);

  const handleAddToCart = (productsId) => {
    console.log(`Ajouter au panier : ${productsId}`);
  };

  return (
    <div className="modal-product-content">
      <div
        className="modal-product-image info-tooltip"
        aria-label="Revenir à l'article"
      >
        <Link
          to={`/master-product/${product?.productsId}`}
          state={{ materialId: product?.material }}
          onClick={handleCloseWishlistModal}
        >
          <img
            src={imageUrl}
            alt={productProperties?.name}
            width="150px"
            height="150px"
          />
        </Link>
      </div>

      <div className="modal-product-details">
        <h3>{productProperties?.name}</h3>
        <p>{materialProperty?.name}</p>
        <p className="price">
          {formatPrice(productProperties.pricing?.currentPrice)}
        </p>
        <div className="modal-product-actions">
          <AddToCartButton
            className="btn"
            onClick={() => handleAddToCart(product?.productsId)}
            buttonText="Ajouter au panier"
          />
        </div>
      </div>
    </div>
  );
};

export default WishlistProductContent;
