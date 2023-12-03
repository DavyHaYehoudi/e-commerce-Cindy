import React from "react";
import {
  getProductDetails,
  getProductProperties,
} from "../../../../../../helpers/storeDataUtils";

const ProductListItem = ({
  product,
  client,
  orderId,
  articleNumber,
  productStore,
  productsActionsStore,
  productsStore
}) => {
  const details = getProductDetails(
    productsActionsStore,
    client.id,
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
