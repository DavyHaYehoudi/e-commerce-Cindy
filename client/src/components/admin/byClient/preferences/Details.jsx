import React from "react";
import Wishlist from "./Wishlist";
import Cart from "./Cart";

const Details = ({ client }) => {
  return (
    <div>
      <div>
        Sa liste de favoris 😉 :{" "}
        {client.wishlist.map((item) => (
          <Wishlist
            key={item.productId}
            productId={item.productId}
            productCart={item}
          />
        ))}
      </div>
      <div>
        Son panier 🤫 :{" "}
        {client.cart.map((item) => (
          <Cart
            key={item.productId}
            productId={item.productId}
            productCart={item}
          />
        ))}
      </div>
    </div>
  );
};

export default Details;
