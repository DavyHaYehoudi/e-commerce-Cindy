import React from "react";
import { getProductsInfo } from "../../../../../../helpers/selectors/products";
import { getProductProperties } from "../../../../../../helpers/selectors/product";

const ProductListItem = ({
  product,
  orderId,
  articleNumber,
  ordersStore,
  productsStore,
  productStore,
}) => {
  const details = getProductsInfo(
    ordersStore,
    productsStore,
    orderId,
    product.productId
  );
  const productProperties = getProductProperties(
    product.productId,
    productStore
  );

  return (
    <small key={product.id}>
      <li className="description">
        <span>- {productProperties.name} </span>
        <span>{details.material}</span>
        <span>
          {" "}
          {articleNumber || 1} article{articleNumber > 1 ? "s" : ""}
        </span>
      </li>
    </small>
  );
};

export default ProductListItem;
