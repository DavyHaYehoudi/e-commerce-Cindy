import React from "react";
import Main from "./item";
import { getProductsInfo } from "../../../../../selectors/products";
import { useSelector } from "react-redux";

const List = ({ client, orderId }) => {
  const ordersStore = useSelector((state) => state?.orders?.data);
  const productsStore = useSelector((state) => state?.products?.data);

  const products = getProductsInfo(
    ordersStore,
    productsStore,
    orderId
  ).productsByOrder;
  return (
    <ul id="products-container" data-testid="products-container">
      <small>
        {products &&
          products.map((products) => (
            <Main
              key={products?.productId}
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
