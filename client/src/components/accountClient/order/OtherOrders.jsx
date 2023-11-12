import React from "react";
import { orderStep } from "../../../constants/orderStep";
import List from "./List";

const OtherOrders = ({ orderHistory, getStepColor }) => {
  const filter = (order) => order.step !== orderStep[2].name;

  return (
    <List
      orderHistory={orderHistory}
      getStepColor={getStepColor}
      filter={filter}
    />
  );
};

export default OtherOrders;
