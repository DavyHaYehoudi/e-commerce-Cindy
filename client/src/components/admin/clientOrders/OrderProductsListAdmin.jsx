import React from "react";
import OrderProductItem from "./OrderProductItemAdmin";

const OrderProductsList = ({ products }) => (
  <ul>
    {products.map((product) => (
      <OrderProductItem key={product.productId} product={product} />
    ))}
  </ul>
);

export default OrderProductsList;
