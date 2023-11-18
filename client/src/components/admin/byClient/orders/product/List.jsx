import React from "react";
import ItemIndex from "./ItemIndex";

const List = ({ products, clientId, orderId }) => (
  <ul id="products-container">
    <small>
      {products.map((product) => (
        <ItemIndex
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
