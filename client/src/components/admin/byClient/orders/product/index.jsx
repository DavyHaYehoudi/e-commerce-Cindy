import React from "react";
import Main from "./item";

const List = ({ products, clientId, orderId, productsActionsStore }) => (
  <ul id="products-container">
    <small>
      {products?.map((product) => (
        <Main
          key={product.productId}
          product={product}
          clientId={clientId}
          orderId={orderId}
          productsActionsStore={productsActionsStore}
        />
      ))}
    </small>
  </ul>
);

export default List;
