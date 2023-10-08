import React from "react";
import TrashIcon from "../dumbs/TrashIcon";
import WishlistProductContent from "./WishlistProductContent";


const WishlistProduct = ({ product }) => {
  const handleDelete = () => {
    console.log("delete");
  };

  return (
    <div key={product.id} className="modal-product-row">
      <WishlistProductContent product={product} />
      <div className="modal-product-remove" onClick={handleDelete}>
        <TrashIcon />
      </div>
    </div>
  );
};

export default WishlistProduct;
