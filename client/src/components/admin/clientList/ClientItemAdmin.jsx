import React from "react";
import { useSelector } from "react-redux";
import { orderStep } from "../../../mocks/orderStep";
import ClientDetailsAdmin from "../clientPresentation/ClientDetailsAdmin";

const badgeMap = {
  isProcessed: "A traiter",
  isInProcessingOrder: "En cours de traitement",
  isCompletedOrder: "Complet",
  Step: orderStep[3].name,
  blink: "blink",
};

const ClientItemAdmin = ({ client, handleClientClick, clientDetails }) => {
  const ordersStep = useSelector(
    (state) => state.ordersStep.find((user) => user.id === client.id)?.orders
  );

  const isClientNotified = ordersStep?.some(
    (order) => !order.isClientNotified
  );

  const renderBadge = (orderType) => {
    const count = ordersStep?.filter((order) => {
      if (orderType === "Step") {
        return order[orderType] === badgeMap[orderType];
      }
      return order[orderType];
    }).length;

    if (count > 0) {
      const badgeClass = `admin-badge ${orderType}-badge`;
      return (
        <span key={orderType} className={badgeClass}>
          {badgeMap[orderType]} ({count})
        </span>
      );
    }

    return null;
  };

  return (
    <li className={`client-item ${isClientNotified ? "notified" : ""}`}>
      <div className="client-header">
        <span>
          {client.firstName} {client.lastName}{" "}
        </span>
        {Object.keys(badgeMap).map((orderType) => renderBadge(orderType))}
        <button onClick={() => handleClientClick(client.id)}>
          {clientDetails[client.id] ? "Fermer" : "Consulter"}
        </button>
      </div>
      {isClientNotified && <div className="notification-bubble blink"></div>}
      {clientDetails[client.id] && <ClientDetailsAdmin client={client} />}
    </li>
  );
};

export default ClientItemAdmin;
