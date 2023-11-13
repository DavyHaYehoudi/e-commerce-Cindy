import React from "react";
import Item from "./Item";

const List = ({ products, clientId, orderId }) => (
  <ul id="products-container">
    <small>
      {products.map((product) => (
        <Item
          key={product.productId}
          product={product}
          clientId={clientId}
          orderId={orderId}
        />
      ))}
    </small>
  </ul>
);

export default List;
