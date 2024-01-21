import React from "react";
import Wishlist from "./Wishlist";
import Cart from "./Cart";

const Details = ({ client }) => {
  return (
    <div>
      <div>
        <p>
          <span className="underline">Sa liste de favoris</span> 😉 :{" "}
        </p>
        {client?.wishlist?.length > 0 ? (
          client.wishlist.map((item) => (
            <Wishlist
              key={item.productId}
              productId={item.productId}
              productCart={item}
            />
          ))
        ) : (
          <p>La liste des favoris est vide</p>
        )}
      </div>
      <div>
        <p>
          <span className="underline">Son panier</span> 🤫 :{" "}
        </p>

        {client?.cart?.length > 0 ? (
          client?.cart?.map((item) => (
            <Cart
              key={item.productId}
              productId={item.productId}
              productCart={item}
            />
          ))
        ) : (
          <p>Le panier est vide</p>
        )}
      </div>
    </div>
  );
};

export default Details;
