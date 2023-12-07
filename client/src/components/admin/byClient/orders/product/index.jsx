import React from "react";
import Main from "./item";
import { getProductsInfo } from "../../../../../selectors/products";
import { useSelector } from "react-redux";

const List = ({
  client,
  orderId,
}) => {
  const ordersStore = useSelector((state) => state.orders);
  const productsStore = useSelector((state) => state.products);

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
          />
        ))}
      </small>
    </ul>
  );
};

export default List;
