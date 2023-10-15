import React from "react";
import { formatDate } from "../../../helpers/formatDate";
import OrderActionsDropdown from "./OrderActionsDropdown";
import OrderStep from "./OrderStep";
const OrderHeader = ({
  clientId,
  order,
  handleSendToDatabase,
  orderIndex,
  lastSentDateToClient,
  step,
}) => {
  return (
    <div className="admin-order-item-header">
      <div className="admin-order-item-header order-header">
        <span>Date de commande : {formatDate(order.date)}</span>
        <OrderStep order={order} />
      </div>
      <OrderActionsDropdown order={order} step={step} />
    </div>
  );
};

export default OrderHeader;
