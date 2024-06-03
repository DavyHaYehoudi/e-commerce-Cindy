import React from "react";
import TrashIcon from "../../shared/TrashIcon";
import WishlistProductContent from "./WishlistProductContent";
import useWishlistProduct from "./hooks/useWishlistProduct";

const WishlistProduct = ({ product, handleCloseWishlistModal }) => {
  const { handleClickTrash } = useWishlistProduct(product);

  return (
    <div key={product.productsId} className="modal-product-row">
      <WishlistProductContent
        product={product}
        handleCloseWishlistModal={handleCloseWishlistModal}
      />
      <div className="modal-product-remove" onClick={handleClickTrash}>
        <TrashIcon />
      </div>
    </div>
  );
};

export default WishlistProduct;
