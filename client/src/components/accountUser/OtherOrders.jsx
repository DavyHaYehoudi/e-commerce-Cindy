import React from "react";
import { orderStep } from "../../mocks/orderStep";
import OrderList from "./OrderList";

const OtherOrders = ({ orderHistory, getStepColor }) => {
  const filter = (order) => order.Step !== orderStep[2].name;
  const title = "Commandes en cours";

  return (
    <OrderList
      orderHistory={orderHistory}
      getStepColor={getStepColor}
      filter={filter}
      title={title}
    />
  );
};

export default OtherOrders;
