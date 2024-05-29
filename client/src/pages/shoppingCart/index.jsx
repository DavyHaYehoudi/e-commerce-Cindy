import React from "react";
import PaymentForm from "../../components/payment/PaymentForm";
import ShoppingCartContent from "../../components/payment/ShoppingCartContent";

const ShoppingCart = () => {
  return (
    <div id="shoppingCart-page">
      <h1>PANIER</h1>
      <div className="shoppingCart-container">
        <section id="shoppingCart-items">
          <ShoppingCartContent />
        </section>
        <section id="shoppingCart-payment">
          <PaymentForm />
        </section>
      </div>
    </div>
  );
};

export default ShoppingCart;