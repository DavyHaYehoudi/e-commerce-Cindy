import React from "react";
import { orderStatus } from "../../mocks/orderStatus";
import OrderList from "./OrderList";

const DeliveredOrders = ({ orderHistory, getStatusColor }) => {
  const filter = (order) => order.status === orderStatus[2].name;
  const title = "Commandes expédiées";

  return (
    <OrderList
      orderHistory={orderHistory}
      getStatusColor={getStatusColor}
      filter={filter}
      title={title}
    />
  );
};

export default DeliveredOrders;
