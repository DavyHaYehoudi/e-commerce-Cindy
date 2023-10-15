import React from "react";
import { orderStep } from "../../mocks/orderStep";
import OrderList from "./OrderList";

const DeliveredOrders = ({ orderHistory, getStepColor }) => {
  const filter = (order) => order.Step === orderStep[2].name;
  const title = "Commandes expédiées";

  return (
    <OrderList
      orderHistory={orderHistory}
      getStepColor={getStepColor}
      filter={filter}
      title={title}
    />
  );
};

export default DeliveredOrders;
