import React from "react";
import { useSelector } from "react-redux";
import OrderProductsDetails from "./OrderProductsDetails";

const Item = ({ orderProducts, orderId }) => {
  const orderProductsStore = useSelector(
    (state) => state?.customer?.data?.orderProducts
  );

  return (
    <div
      className="order-items-user-account"
      data-testid="order-items-user-account"
    >
      {orderProducts &&
        orderProductsStore &&
        orderProductsStore
          .filter((ps) => orderProducts.some((p) => ps?.orderId === orderId))
          .map((orderProductsItem) => (
            <OrderProductsDetails
              key={orderProductsItem?._id}
              orderProductsItem={orderProductsItem}
              orderProductsStore={orderProductsStore}
              orderId={orderId}
            />
          ))}
    </div>
  );
};

export default Item;
