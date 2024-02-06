import React from "react";
import { formatDate } from "../../../../../helpers/utils/formatDate";
import ActionsDropdown from "./ActionsDropdown";
import OrderStep from "../../../../../shared/OrderStep";
const Header = ({
  order,
  handleSendToClient,
  step,
  isClientNotified,
  lastSentDateToClient,
}) => {
  return (
    <div
      className="admin-order-item-header"
      data-testid="admin-order-item-header"
    >
      <div className="admin-order-item-header order-header">
        <span>
          <span className="dotted">Date de commande</span> :{" "}
          {order.createdAt ? formatDate(order.createdAt) : "Date NC"}
        </span>
        <OrderStep order={order} />
      </div>

      <ActionsDropdown
        order={order}
        step={step}
        handleSendToClient={handleSendToClient}
        isClientNotified={isClientNotified}
        lastSentDateToClient={lastSentDateToClient}
      />
    </div>
  );
};

export default Header;
