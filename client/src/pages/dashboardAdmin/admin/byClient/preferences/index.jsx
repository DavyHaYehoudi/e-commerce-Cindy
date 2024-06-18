import React from "react";
import ProductItem from "./ProductItem";

const Details = ({ client }) => {
  return (
    <div>
      <div>
        <p>
          <span className="underline">Sa liste de favoris</span> 😉 :{" "}
        </p>
        {client?.wishlist?.length > 0 ? (
          client.wishlist.map((item, i) => (
            <ProductItem
              key={i}
              productsId={item?.productsId}
              productCart={item}
              type="wishlist"
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
          client?.cart?.map((item, i) => (
            <ProductItem
              key={i}
              productsId={item?.productsId}
              productCart={item}
              type="cart"
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
