import React from "react";
import { getProductsInfo } from "../../../../../../selectors/products";
import { getProductProperties } from "../../../../../../selectors/product";
import { getMaterialProperty } from "../../../../../../helpers/constants/materials";
import { useSelector } from "react-redux";

const ProductListItem = ({
  product,
  orderId,
  articleNumber,
  productStore,
}) => {
  const ordersStore = useSelector((state) => state.orders);
  const productsStore = useSelector((state) => state.products);
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
        <span>{getMaterialProperty(details.material).name}</span>
        <span>
          {" "}
          {articleNumber || 1} article{articleNumber > 1 ? "s" : ""}
        </span>
      </li>
    </small>
  );
};

export default ProductListItem;
