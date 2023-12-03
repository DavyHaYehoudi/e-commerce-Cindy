import React from "react";
import Main from "./item";
import { getProductsInfo } from "../../../../../helpers/selectors/products";

const List = ({
  client,
  orderId,
  productsActionsStore,
  ordersStore,
  productsStore,
}) => {
  const products = getProductsInfo(
    ordersStore,
    productsStore,
    orderId
  ).productsByOrder;
  return (
    <ul id="products-container">
      <small>
        {products?.map((product) => (
          <Main
            key={product.productId}
            product={product}
            client={client}
            orderId={orderId}
            productsActionsStore={productsActionsStore}
            ordersStore={ordersStore}
            productsStore={productsStore}
          />
        ))}
      </small>
    </ul>
  );
};

export default List;
