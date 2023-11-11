import React from "react";
import { orderStep } from "../../../mocks/orderStep";
import List from "./List";

const Delivered = ({ orderHistory, getStepColor }) => {
  const filter = (order) => order.step === orderStep[2].name;
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
