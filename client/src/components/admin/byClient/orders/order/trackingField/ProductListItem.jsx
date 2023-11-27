import React from "react";
import {
  getProductDetails,
  getProductProperties,
} from "../../../../../../helpers/storeDataUtils";

const ProductListItem = ({
  product,
  clientId,
  orderId,
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
    <small>
      <li className="description" key={product.id}>
        <span>- {productProperties.name} </span>
        <span>{details.material}</span>
        <span>
          {" "}
          {details.articleNumber} article{details.articleNumber > 1 ? "s" : ""}
        </span>
      </li>
    </small>
  );
};

export default ProductListItem;
