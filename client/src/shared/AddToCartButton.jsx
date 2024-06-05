import React from "react";
import useCartButton from "./hooks/useCartButton";
import { BsCartPlusFill } from "react-icons/bs";
import { BsCartDashFill } from "react-icons/bs";

const AddToCartButton = ({ productsId, material }) => {
  const { handleRemoveToCart, isProductInCart, handleAddToCart } =
  useCartButton(productsId, material);
  return (
    <>
      {isProductInCart ? (
        <button className="cart-button btn" onClick={handleRemoveToCart}>
          <BsCartDashFill />
          <span>Retirer du panier </span>
        </button>
      ) : (
        <button
          className="cart-button btn add"
          onClick={handleAddToCart}
        >
          <span>Ajouter au panier</span>
          <BsCartPlusFill />
        </button>
      )}
    </>
  );
}; 

export default AddToCartButton;
