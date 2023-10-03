import React from "react";
import bo from "../assets/bo.png";
import bar from "../assets/bo.png";
import bra from "../assets/bo.png";
import PaymentForm from "../components/smarts/PaymentForm";
import ShoppingCartContent from "../components/smarts/ShoppingCartContent";

const ShoppingCart = () => {
  const carts = [bo, bar, bra];
  return (
    <div id="shoppingCart-page">
      <h1>PANIER</h1>
      <section className="shoppingCart-items">
        <ShoppingCartContent carts ={carts} />
      </section>
      <section id="shoppingCart-payment">
        <PaymentForm />
      </section>
    </div>
  );
};

export default ShoppingCart;
