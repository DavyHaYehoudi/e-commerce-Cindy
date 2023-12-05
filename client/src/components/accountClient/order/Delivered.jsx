import React from "react";
import { orderStep } from "../../../constants/orderStep";
import List from "./List";
import { getOrderStepProperty } from "../../../helpers/constants/orderStep";

const Delivered = ({ orderHistory, getStepColor }) => {
  const filter = (order) =>getOrderStepProperty(order.step).name  === orderStep[2].name;
  const title = "Commandes expédiées";

  return (
    <List
      orderHistory={orderHistory}
      getStepColor={getStepColor}
      filter={filter}
      title={title}
    />
  );
};

export default Delivered;
