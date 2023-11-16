import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import WishlistProduct from "./WishlistProduct";
import WishlistModalActions from "./WishlistModalActions";

const WishlistModal = ({
  isOpen,
  onClose,
  favoriteProducts,
}) => {
  return (
    <div
      className={`wishlist-modal ${isOpen ? "open" : ""}`}
      aria-hidden="true"
    >
      <div
        className="modal-content"
        role="dialog"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-header-top">
            <h2>Mes favoris </h2>
            <button onClick={onClose} aria-label="Fermer la fenêtre">
              <AiOutlineCloseCircle aria-hidden="true" />
            </button>
          </div>
          <div className="modal-header-bottom">
            <WishlistModalActions />
          </div>
        </div>
        <div className="modal-body">
          {favoriteProducts.map((product, i) => (
            <WishlistProduct
              key={i}
              product={product}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistModal;
