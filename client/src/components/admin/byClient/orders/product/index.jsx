import React from "react";
import Main from "./item";

const List = ({ products, clientId, orderId }) => (
  <ul id="products-container">
    <small>
      {products?.map((product) => (
        <Main
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
