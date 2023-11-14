import React from "react";
import Item from "./Item";

const List = ({ products, clientId, orderId }) => (
  <ul id="products-container">
    <small>
      {products.map((product,index) => (
        <Item
          key={product.productId}
          product={product}
          productIndex={index}
          clientId={clientId}
          orderId={orderId}
        />
      ))}
    </small>
  </ul>
);

export default List;
