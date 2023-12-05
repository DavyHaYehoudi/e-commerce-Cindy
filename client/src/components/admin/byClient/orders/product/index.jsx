import React from "react";
import Main from "./item";
import { getProductsInfo } from "../../../../../helpers/selectors/products";

const List = ({
  client,
  orderId,
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
        {products?.map((products) => (
          <Main
            key={products.productId}
            products={products}
            client={client}
            orderId={orderId}
            ordersStore={ordersStore}
            productsStore={productsStore}
          />
        ))}
      </small>
    </ul>
  );
};

export default List;
