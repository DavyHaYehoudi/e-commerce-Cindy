import React from "react";
import bo from "../assets/bo.png";
import bar from "../assets/bo.png";
import bra from "../assets/bo.png";
import OrderItem from "../components/dumbs/OrderItem";
import PaymentForm from "../components/smarts/PaymentForm";

const ShoppingCart = () => {
  const carts = [bo, bar, bra];
  return (
    <>
    <section id="shoppingCart-section">
      <h1>PANIER</h1>
      <div className="shoppingCart-container">
        <div className="shoppingCart-tabs">
          <p className="shoppingCart-tab">PRODUIT</p>
          <p className="shoppingCart-tab">QUANTITE</p>
          <p className="shoppingCart-tab">TOTAL</p>
        </div>

        {carts.map((cart, i) => (
          <OrderItem cart={cart} key={i} />
        ))}
        <div className="shoppingCart-total">TOTAL : <b>€942,00 EUR</b></div>
      </div>
    </section>
    <section id="shoppingCart-payment" >
<PaymentForm />
    </section>
    </>
  );
};

export default ShoppingCart;
