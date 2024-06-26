import React from "react";
import PaymentForm from "../../components/payment/PaymentForm";
import ShoppingCartContent from "../../components/payment/ShoppingCartContent";
import { BsFillTrash2Fill } from "react-icons/bs";
import useCartOffcanvas from "../MasterProduct/hooks/useCartOffcanvas";
import CartOffcanvas from "../MasterProduct/cartAccess";

const ShoppingCart = () => {
  const { isCartContent, handleClearCart } = useCartOffcanvas();
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
        <section id="shoppingCart-payment">
          <PaymentForm />
        </section>
      </div>
      <CartOffcanvas />
    </div>
  );
};

export default ShoppingCart;
