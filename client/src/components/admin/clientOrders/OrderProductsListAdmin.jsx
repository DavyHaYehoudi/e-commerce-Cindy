import React from "react";
import OrderProductItem from "./OrderProductItemAdmin";

const OrderProductsListAdmin = ({ products }) => (
  <ul>
    {products.map((product) => (
      <OrderProductItem key={product.productId} product={product} />
    ))}
  </ul>
);

export default OrderProductsListAdmin;
