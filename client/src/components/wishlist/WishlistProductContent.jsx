import React from "react";
import { Link } from "react-router-dom";
import AddToCartButton from "../../shared/AddToCartButton";
import { getProductProperties } from "../../selectors/product";
import { formatPrice } from "../../helpers/utils/prices";
import { getMaterialProperty } from "../../selectors/material";
import useWishlistProductContent from "./hooks/useWishlistProductContent";
import useFirebaseImage from "../../shared/hooks/useFirebaseImage";
import { useDispatch } from "react-redux";
import { showWishlistAccess } from "../../features/admin/productSlice";

const WishlistProductContent = ({ product }) => {
  const { productsId, material } = product || {};
  const {
    productStore,
    collectionStore,
    categoryStore,
    tagStore,
    materialStore,
  } = useWishlistProductContent(product);

  const productProperties = getProductProperties(
    productsId,
    productStore,
    collectionStore,
    categoryStore,
    tagStore,
    material
  );
  const dispatch = useDispatch();
  const materialProperty = getMaterialProperty(material, materialStore);
  const { imageUrl } = useFirebaseImage(productProperties?.main_image);
  const handleCloseWishlistModal = () => {
    dispatch(showWishlistAccess(false));
  };
  return (
    <div className="modal-product-content">
      <div
        className="modal-product-image info-tooltip"
        aria-label="Revenir à l'article"
      >
        <Link
          to={`/master-product/${productsId}`}
          state={{ materialId: material }}
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
          <AddToCartButton productsId={productsId} material={material} />
        </div>
      </div>
    </div>
  );
};

export default WishlistProductContent;
