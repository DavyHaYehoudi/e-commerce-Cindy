import React from "react";
import { useSelector } from "react-redux";
import ClientDetails from "../clientPresentation/ClientDetails";

const badgeMap = {
  isProcessed: "A traiter",
  isInProcessingOrder: "En cours de traitement",
  isCompletedOrder: "Complet",
  blink: "blink",
};

const ClientItem = ({ client, handleClientClick, clientDetails }) => {
  const ordersStatus = useSelector(
    (state) => state.ordersStatus.find((user) => user.id === client.id)?.orders
  );

  const isClientNotified = ordersStatus?.some(
    (order) => !order.isClientNotified
  );

  const renderBadge = (orderType) => {
    const count = ordersStatus?.filter((order) => order[orderType]).length;

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
      {clientDetails[client.id] && <ClientDetails client={client} />}
    </li>
  );
};

export default ClientItem;
