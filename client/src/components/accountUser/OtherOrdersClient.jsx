import React from "react";
import { orderStep } from "../../mocks/orderStep";
import OrderList from "./OrderListClient";

const OtherOrdersClient = ({ orderHistory, getStepColor }) => {
  const filter = (order) => order.step !== orderStep[2].name;
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

export default OtherOrdersClient;
