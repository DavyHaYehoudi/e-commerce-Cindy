import React from "react";
import { FaCartArrowDown } from "react-icons/fa";
import { BsTrash } from "react-icons/bs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useWishlistActions from "./hooks/useWishlistActions"

const WishlistModalActions = () => {
  const { handleAddAllToCart, handleClearWishlist } = useWishlistActions();

  return (
    <>
      <div
        onClick={handleAddAllToCart}
        className="info-tooltip"
        aria-label="Tout ajouter au panier"
      >
        <FaCartArrowDown className="wishlist-icon-actions" aria-hidden="true" />
      </div>
      <div
        onClick={handleClearWishlist}
        className="info-tooltip"
        aria-label="Supprimer la liste"
      >
        <BsTrash className="wishlist-icon-actions" />
      </div>
      <ToastContainer autoClose={2500} />
    </>
  );
};

export default WishlistModalActions;
