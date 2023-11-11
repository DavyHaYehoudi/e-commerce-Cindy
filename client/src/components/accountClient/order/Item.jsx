import React from "react";
import { Link } from "react-router-dom";

const Item = ({ products }) => {
  return (
    <div className="order-items-user-account">
      {products.map((product) => (
        <div key={product.name} className="order-item-user-account">
          <div className="order-info">
            <p>Nom du produit : {product.name}</p>
            <p>Matériau : {product.material}</p>
            <p>Quantité : {product.quantity}</p>
            <p>Prix unitaire : {product.price}</p>
          </div>
          <div
            className="image-container info-tooltip"
            aria-label="Revenir au produit"
          >
            <Link>
              <img
                src={product.image}
                alt="Product"
                style={{ width: "100px", height: "150px" }}
              />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Item;
