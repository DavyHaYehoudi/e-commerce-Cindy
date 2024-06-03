import React from "react";

const AddToCartButton = ({productsId,material,quantity=1,addDate}) => {
  const handleAddToCart = () => {
  };

  return (
    <button className="add-cart-button btn" onClick={handleAddToCart}>
    Ajouter au panier
  </button>
  );
};

export default AddToCartButton;
