import React from "react";

const OrderItems = ({ products, image }) => {
  return (
    <div className="order-items">
      {products.map((product) => (
        <>
          <div key={product.name} className="order-item">
            <p>Nom du produit : {product.name}</p>
            <p>Matériau : {product.material}</p>
            <p>Quantité : {product.quantity}</p>
            <p>Prix unitaire : {product.price}</p>
          </div>
          <div className="image-container">
            <img
              src={product.image}
              alt="Product"
              style={{ width: "100px", height: "150px" }}
            />
          </div>
        </>
      ))}
    </div>
  );
};

export default OrderItems;
