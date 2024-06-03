import React from "react";
import TrashIcon from "../../shared/TrashIcon";
import WishlistProductContent from "./WishlistProductContent";


const WishlistProduct = ({ product,handleCloseWishlistModal }) => {
  const handleDelete = () => {
    console.log("delete");
  };

  return (
    <div key={product.productsId} className="modal-product-row">
      <WishlistProductContent product={product} handleCloseWishlistModal={handleCloseWishlistModal} />
      <div className="modal-product-remove" onClick={handleDelete}>
        <TrashIcon />
      </div>
    </div>
  );
};

export default WishlistProduct;
