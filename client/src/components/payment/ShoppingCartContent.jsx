import React from "react";
import OrderItem from "./OrderItem";
import { formatPrice } from "../../helpers/utils/prices";

const ShoppingCartContent = ({carts} ) => {
  return (
    <div className="shoppingCart-content">
      <div className="shoppingCart-tabs">
        <p className="shoppingCart-tab">PRODUIT</p>
        <p className="shoppingCart-tab">QUANTITE</p>
        <p className="shoppingCart-tab">TOTAL</p>
      </div>

      {carts.map((cart, i) => (
        <OrderItem cart={cart} key={i} />
      ))}
      <div className="shoppingCart-total">
        TOTAL : <b>{formatPrice(717)} </b>
      </div>
    </div>
  );
};

export default ShoppingCartContent;
