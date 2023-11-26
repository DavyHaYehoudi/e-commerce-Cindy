import React from "react";
import Main from "./item/Main";

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
