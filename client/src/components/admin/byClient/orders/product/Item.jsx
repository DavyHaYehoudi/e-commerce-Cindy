import React from "react";

const Item = ({ product }) => (
<li>
  Référence: {product.productId} - {product.name} - {product.material} - {product.quantity}{" "}
  unité{product.quantity > 1 ? "s" : ""} - {product.price}
</li>

);

export default Item;
