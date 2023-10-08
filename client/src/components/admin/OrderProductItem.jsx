import React from "react";

const OrderProductItem = ({ product }) => (
<li>
  Référence: {product.productId} - {product.name} - {product.quantity}{" "}
  unité{product.quantity > 1 ? "s" : ""} - {product.price}
</li>

);

export default OrderProductItem;
