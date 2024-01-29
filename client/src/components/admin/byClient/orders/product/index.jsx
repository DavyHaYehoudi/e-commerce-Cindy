import React from "react";
import Main from "./item";
import { getProductsInfo } from "../../../../../selectors/productsByOrder";
import { useSelector } from "react-redux";

const List = ({ client, orderId }) => {
  const ordersStore = useSelector((state) => state?.orders?.data);
  const productsByOrderStore = useSelector((state) => state?.productsByOrder?.data);

  const productsByOrder = getProductsInfo(
    ordersStore,
    productsByOrderStore,
    orderId
  ).productsByOrderByOrder;
  return (
    <ul id="productsByOrder-container" data-testid="productsByOrder-container">
      <small>
        {productsByOrder &&
          productsByOrder.map((productsByOrder) => (
            <Main
              key={productsByOrder?.productId}
              productsByOrder={productsByOrder}
              client={client}
              orderId={orderId}
            />
          ))}
      </small>
    </ul>
  );
};
 
export default List;
