import React, { useState } from 'react';
import { FaMinus, FaPlus } from "react-icons/fa";

const QuantitySelectProduct = () => {
    const [quantity, setQuantity] = useState(1);

    const handleDecrement = () => {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    };
  
    const handleIncrement = () => {
      setQuantity(quantity + 1);
    };
  
    return (
      <div className="quantity-select">
        <button onClick={handleDecrement}>
          <FaMinus />
        </button>
        <span>{quantity}</span>
        <button onClick={handleIncrement}>
          <FaPlus />
        </button>
      </div>
    );
};

export default QuantitySelectProduct;