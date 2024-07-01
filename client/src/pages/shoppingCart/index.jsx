import React from "react";
import ShoppingCartContent from "../../components/shoppingCart/ShoppingCartContent";
import { BsFillTrash2Fill } from "react-icons/bs";
import useCartOffcanvas from "../MasterProduct/hooks/useCartOffcanvas";
import { useNavigate } from "react-router-dom";

const ShoppingCart = () => {
  const { isCartContent, handleClearCart } = useCartOffcanvas();
  const navigate = useNavigate();
  const handlePaymentProcess = () => {
    navigate("/cart/payment");
  };
  return (
    <div id="shoppingCart-page">
      <h1>MON PANIER</h1>
      {isCartContent && (
        <div
          className="cart-clear info-tooltip"
          aria-label="Vider le panier"
          onClick={handleClearCart}
        >
          <BsFillTrash2Fill className="cart-clear-trash" />
        </div>
      )}
      <div className="shoppingCart-container">
        <section id="shoppingCart-items">
          <ShoppingCartContent />
        </section>
      </div>
      <button
        className="btn payment-button"
        type="button"
        onClick={handlePaymentProcess}
        disabled={!isCartContent}
      >
        Procéder au paiement
      </button>
    </div>
  );
};

export default ShoppingCart;
