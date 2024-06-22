import React from "react";
import { orderStep } from "../../../../constants/orderStep";
import List from "../order";
import { getOrderStepProperty } from "../../../../helpers/constants/orderStep";

const OtherOrders = ({ orderHistory, getStepColor }) => {
  const filter = (order) =>
    getOrderStepProperty(order.step).name !== orderStep[2].name;

  return (
    <List
      orderHistory={orderHistory}
      getStepColor={getStepColor}
      filter={filter}
    />
  );
};

export default OtherOrders; 
