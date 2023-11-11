import React from "react";
import { orderStep } from "../../../mocks/orderStep";
import List from "./List";

const OtherOrders = ({ orderHistory, getStepColor }) => {
  const filter = (order) => order.step !== orderStep[2].name;
  const title = "Commandes en cours";

  return (
    <List
      orderHistory={orderHistory}
      getStepColor={getStepColor}
      filter={filter}
      title={title}
    />
  );
};

export default OtherOrders;
