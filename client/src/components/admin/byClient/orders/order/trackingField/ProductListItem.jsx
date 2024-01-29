import React from "react";
import { getProductsInfo } from "../../../../../../selectors/productsByOrder";
import { getProductProperties } from "../../../../../../selectors/product";
import { getMaterialProperty } from "../../../../../../helpers/constants/materials";
import { useSelector } from "react-redux";

const ProductListItem = ({ product, orderId, articleNumber, productStore }) => {
  const ordersStore = useSelector((state) => state?.orders?.data);
  const productsByOrderStore = useSelector((state) => state?.productsByOrder?.data);

  const details = getProductsInfo(
    ordersStore,
    productsByOrderStore,
    orderId,
    product.productId
  );
  const productProperties = getProductProperties(
    product.productId,
    productStore
  );
  return (
    <small key={product._id}>
      <li className="description">
        <span>- {productProperties.name} </span>
        <span>{getMaterialProperty(details.material)?.name}</span>
        <span>
          {" "}
          {articleNumber || 1} article{articleNumber > 1 ? "s" : ""}
        </span>
      </li>
    </small>
  );
};

export default ProductListItem;
