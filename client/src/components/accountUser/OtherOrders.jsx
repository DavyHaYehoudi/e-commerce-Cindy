import React from "react";
import { orderStatus } from "../../mocks/orderStatus";
import OrderList from "./OrderList";

const OtherOrders = ({ orderHistory, getStatusColor }) => {
  const filter = (order) => order.status !== orderStatus[2].name;
  const title = "Commandes en cours";

  return (
    <OrderList
      orderHistory={orderHistory}
      getStatusColor={getStatusColor}
      filter={filter}
      title={title}
    />
  );
};

export default OtherOrders;
