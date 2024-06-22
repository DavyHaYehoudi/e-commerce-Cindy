import React from "react";
import TrashIcon from "../../shared/TrashIcon";
import WishlistProductContent from "./WishlistProductContent";
import useWishlistProduct from "./hooks/useWishlistProduct";

const WishlistProduct = ({ product }) => {
  const { handleClickTrash } = useWishlistProduct(product);

  return (
    <div key={product.productsId} className="modal-product-row">
      <WishlistProductContent product={product} />
      <div className="modal-product-remove" onClick={handleClickTrash}>
        <TrashIcon />
      </div>
    </div>
  );
};

export default WishlistProduct;
