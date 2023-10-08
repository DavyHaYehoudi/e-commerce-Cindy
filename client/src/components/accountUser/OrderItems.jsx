import React from "react";

const OrderItems = ({ items }) => {
  return (
    <div className="order-items">
      {items.map((item) => (
        <div key={item.name} className="order-item">
          <p>Nom du produit : {item.name}</p>
          <p>Matériau : {item.material}</p>
          <p>Quantité : {item.quantity}</p>
          <p>Prix unitaire : {item.price}</p>
        </div>
      ))}
    </div>
  );
};

export default OrderItems;
