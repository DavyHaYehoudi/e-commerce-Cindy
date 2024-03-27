import React from "react";
import { Link } from "react-router-dom";
import AddToCartButton from "../../shared/AddToCartButton";
import { useSelector } from "react-redux";
import { getProductProperties } from "../../selectors/product";
import { formatPrice } from "../../helpers/utils/prices";
import { getMaterialProperty } from "../../selectors/material";

const WishlistProductContent = ({ product }) => {
  const productStore = useSelector((state) => state?.product?.data);
  const collectionStore = useSelector((state) => state?.collection?.data);
  const categoryStore = useSelector((state) => state?.category?.data);
  const tagStore = useSelector((state) => state?.tag?.data);
  const materialStore = useSelector((state) => state?.material?.data);

  const handleAddToCart = (productsId) => {
    console.log(`Ajouter au panier : ${productsId}`);
  };
  return (
    <div className="modal-product-content">
      <div
        className="modal-product-image info-tooltip"
        aria-label="Revenir à l'article"
      >
        <Link to={`/orderProducts/${product?.productsId}`}>
          <img
            src={`/photos/${
              getProductProperties(
                product?.productsId,
                productStore,
                collectionStore,
                categoryStore,
                tagStore,
                product?.material
              )?.main_image
            }`}
            alt={
              getProductProperties(
                product?.productsId,
                productStore,
                collectionStore,
                categoryStore,
                tagStore,
                product?.material
              )?.name
            }
            width="100px"
            height="150px"
          />
        </Link>
      </div>

      <div className="modal-product-details">
        <h3>
          {
            getProductProperties(
              product?.productsId,
              productStore,
              collectionStore,
              categoryStore,
              tagStore,
              product?.material
            )?.name
          }
        </h3>
        <p>{getMaterialProperty(product?.material, materialStore)?.name}</p>
        <p className="price">
          {formatPrice(
            getProductProperties(
              product?.productsId,
              productStore,
              collectionStore,
              categoryStore,
              tagStore,
              product?.material
            )?.pricing?.currentPrice
          )}
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
