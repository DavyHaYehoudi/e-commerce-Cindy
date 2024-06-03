import React from "react";
import { FaCartArrowDown } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WishlistModalActions = () => {

  const handleAddAllToCart = () => {
    toast.success("Tous les produits ont été ajoutés au panier 👍 !");
  };

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
