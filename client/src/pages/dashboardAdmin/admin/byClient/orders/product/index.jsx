import React from "react";
import Main from "./item";
import { getProductsInfo } from "../../../../../../selectors/orderProducts";
import { useSelector } from "react-redux";

const List = ({ client, orderId }) => {
  const ordersStore = useSelector((state) => state?.orders?.data);
  const orderProductsStore = useSelector((state) => state?.orderProducts?.data);

  const orderProducts = getProductsInfo(
    ordersStore,
    orderProductsStore,
    orderId
    ).getProductsByOrder;
  return (
    <ul id="orderProducts-container" data-testid="orderProducts-container">
      <small>
        {orderProducts &&
          orderProducts.map((orderProducts) => (
            <Main
              key={orderProducts?._id}
              orderProducts={orderProducts}
              client={client}
              orderId={orderId}
            />
          ))}
      </small>
    </ul>
  );
};
 
export default List;
