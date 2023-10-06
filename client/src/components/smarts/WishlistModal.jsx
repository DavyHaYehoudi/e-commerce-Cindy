import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import bo from "../../assets/bo.png";
import bar from "../../assets/bar.png";
import bra from "../../assets/bra.png";
import col from "../../assets/col.png";
import WishlistProduct from "./WishlistProduct";
import WishlistModalActions from "./WishlistModalActions";

const WishlistModal = ({ isOpen, onClose, favoriteProducts }) => {
  const favoriteProductsMock = [
    { id: 1, title: "produit 1", image: bo, material: "Or", price: "25,00€" },
    {
      id: 2,
      title: "produit 2",
      image: bar,
      material: "Argent",
      price: "55,00€",
    },
    {
      id: 3,
      title: "produit 3",
      image: bra,
      material: "Laiton",
      price: "40,00€",
    },
    {
      id: 4,
      title: "produit 4",
      image: col,
      material: "Cuivre",
      price: "84,00€",
    },
  ];

  return (
    <div className={`wishlist-modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-top">
            <h2>Mes favoris </h2>
            <button onClick={onClose}>
              <AiOutlineCloseCircle />
            </button>
          </div>
          <div className="modal-header-bottom">
            <WishlistModalActions />
          </div>
        </div>
        <div className="modal-body">
          {favoriteProductsMock.map((product) => (
            <WishlistProduct product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistModal;
