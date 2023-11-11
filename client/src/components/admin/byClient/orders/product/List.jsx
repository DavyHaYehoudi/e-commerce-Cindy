import React from "react";
import OrderItem from "./Item";

const List = ({ products }) => (
  <ul>
    {products.map((product) => (
      <OrderItem key={product.productId} product={product} />
    ))}
  </ul>
);

export default List;
