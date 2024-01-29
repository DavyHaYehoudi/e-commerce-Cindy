import React from "react";
import OrderItem from "./OrderItem";
import { formatPrice } from "../../helpers/utils/prices";
import { useSelector } from "react-redux";

const ShoppingCartContent = () => {
  const carts = useSelector((state) => state?.customer?.data?.client?.cart);

  return (
    <div className="shoppingCart-content" data-testid="shoppingCart-content">
      <div className="shoppingCart-tabs">
        <p className="shoppingCart-tab">PRODUIT</p>
        <p className="shoppingCart-tab">QUANTITE</p>
        <p className="shoppingCart-tab">TOTAL</p>
      </div>

      {carts && carts.length > 0 ? (
        carts.map((cart) => <OrderItem cart={cart} key={cart.productId} />)
      ) : (
        <p>VOTRE PANIER EST VIDE</p>
      )}
      <div className="shoppingCart-total">
        TOTAL : <b>{formatPrice(717)} A CALCULER PAR LE BACK</b>
      </div>
    </div>
  );
};

export default ShoppingCartContent;
