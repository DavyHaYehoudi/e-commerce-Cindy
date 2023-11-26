import React from "react";
import Wishlist from "./Wishlist";
import Cart from "./Cart";

const Details = ({ client }) => {
  return (
    <div>
      <div>
        <p>
          <u>Sa liste de favoris</u> 😉 :{" "}
        </p>

        {client?.wishlist?.map((item) => (
          <Wishlist
            key={item.productId}
            productId={item.productId}
            productCart={item}
          />
        )) || <p>La liste des favoris est vide</p>}
      </div>
      <div>
        <p>
          <u>Son panier</u> 🤫 :{" "}
        </p>

        {client?.cart?.map((item) => (
          <Cart
            key={item.productId}
            productId={item.productId}
            productCart={item}
          />
        )) || <p>Le panier est vide</p>}
      </div>
    </div>
  );
};

export default Details;
