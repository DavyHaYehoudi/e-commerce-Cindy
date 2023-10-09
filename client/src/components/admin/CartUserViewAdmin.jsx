import React from "react";
import { Link } from "react-router-dom";

const CartUserViewAdmin = ({ item }) => {
  return (
    <div className="cartUserViewAdmin">
      <div>
        <p>Product ID: {item.productId}</p>
        <p>Name: {item.name}</p>
        <p>Material: {item.material}</p>
        <p>Price: {item.price}</p>
      </div>
      <div className="info-tooltip" aria-label="Revenir à la fiche produit">
        <Link>
          <img src={item.image} alt={item.name} width="100px" height="100px" />
        </Link>
      </div>
    </div>
  );
};

export default CartUserViewAdmin;
