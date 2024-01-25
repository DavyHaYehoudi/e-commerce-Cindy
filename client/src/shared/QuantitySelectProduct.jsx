import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

const QuantitySelectProduct = ({handleChangeQuantity}) => {
  const [quantity, setQuantity] = useState(1);

 
  const handleDecrement = () => {
    if (quantity > 1) { 
      setQuantity((prevQuantity) => {
        const newQuantity = prevQuantity - 1;
        handleChangeQuantity(newQuantity);
        return newQuantity;
      });
    }
  };

  const handleIncrement = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      handleChangeQuantity(newQuantity);
      return newQuantity;
    });
  };

  return (
    <div className="quantity-select">
      <button onClick={handleDecrement} aria-label="Soustraire un article">
        <FaMinus className="quantity-icon" aria-hidden="true" />
      </button>
      <span>{quantity}</span>
      <button onClick={handleIncrement} aria-label="Ajouter un article">
        <FaPlus className="quantity-icon" aria-hidden="true" />
      </button>
    </div>
  );
};

export default QuantitySelectProduct;
