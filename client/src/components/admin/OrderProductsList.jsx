import React from "react";
import OrderProductItem from "./OrderProductItem";

const OrderProductsList = ({ products }) => (
  <ul>
    {products.map((product) => (
      <OrderProductItem key={product.productId} product={product} />
    ))}
  </ul>
);

export default OrderProductsList;
