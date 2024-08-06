import React from "react";
import { FaCartArrowDown } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useWishlistActions from "./hooks/useWishlistActions";

const WishlistModalActions = () => {
  const { handleAddAllToCart } = useWishlistActions();

  return (
    <>
      <div
        onClick={handleAddAllToCart}
        className="info-tooltip"
        aria-label="Tout ajouter au panier"
      >
        <FaCartArrowDown className="wishlist-icon-actions" aria-hidden="true" />
      </div>
      <ToastContainer autoClose={2500} />
    </>
  );
};

export default WishlistModalActions;
