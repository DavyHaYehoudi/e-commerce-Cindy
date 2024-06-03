import React from "react";
import useCartButton from "./hooks/useCartButton";

const AddToCartButton = ({ productsId, material, quantity = 1 }) => {
  const { handleAddToCart, handleRemoveToCart, isProductInCart } =
    useCartButton(productsId, material, quantity);
  return (
    <>
      {isProductInCart ? (
        <button className="cart-button btn" onClick={handleRemoveToCart}>
          <span>Retirer du panier </span>
          <span>🛒 ❌</span>
        </button>
      ) : (
        <button className="cart-button btn" onClick={handleAddToCart}>
          <span>Ajouter au panier</span>
          <span>🛒 ➕</span>
        </button>
      )}
    </>
  );
};

export default AddToCartButton;
