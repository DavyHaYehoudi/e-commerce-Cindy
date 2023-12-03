import React from "react";
import { formatDate } from "../../../../../helpers/formatDate";
import ActionsDropdown from "./ActionsDropdown";
import OrderStep from "../../../../../shared/OrderStep";
const Header = ({
  order,
  handleSendToClient,
  step,
  client,
  isClientNotified,
  lastSentDateToClient,
}) => {
  return (
    <div className="admin-order-item-header">
      <div className="admin-order-item-header order-header">
        <span>Date de commande : {order.date?formatDate(order.date):"Date NC"}</span>
        <OrderStep order={order} />
      </div>
      
      <ActionsDropdown
        order={order}
        step={step}
        client={client}
        handleSendToClient={handleSendToClient}
        isClientNotified={isClientNotified}
        lastSentDateToClient={lastSentDateToClient}
      />
    </div>
  );
};

export default Header;
