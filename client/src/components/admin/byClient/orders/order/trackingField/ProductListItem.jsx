import React from "react";
import {
  getProductDetails,
  getProductProperties,
} from "../../../../../../helpers/storeDataUtils";

const ProductListItem = ({
  product,
  clientId,
  orderId,
  articleNumber,
  productsStore,
  productActions,
}) => {
  const details = getProductDetails(
    productActions,
    clientId,
    orderId,
    product.productId
  );
  const productProperties = getProductProperties(
    product.productId,
    productsStore
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
