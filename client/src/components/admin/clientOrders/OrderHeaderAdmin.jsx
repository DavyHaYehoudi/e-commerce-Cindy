import React from "react";
import { formatDate } from "../../../helpers/formatDate";
import OrderActionsDropdown from "./OrderActionsDropdownAdmin";
import OrderStep from "../../dumbs/OrderStep";
const OrderHeaderAdmin = ({
  order,
  handleSendToClient,
  step,
}) => {
  return (
    <div className="admin-order-item-header">
      <div className="admin-order-item-header order-header">
        <span>Date de commande : {formatDate(order.date)}</span>
        <OrderStep order={order} />
      </div>
      <OrderActionsDropdown
        order={order}
        step={step}
        handleSendToClient={handleSendToClient}
      />
    </div>
  );
};

export default OrderHeaderAdmin;
