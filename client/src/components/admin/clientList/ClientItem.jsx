import React, { useState, useEffect } from "react";
import ClientDetails from "../clientPresentation/ClientDetails";

const badgeMap = {
  newOrder: "Nouveau",
  inProcessingOrder: "En cours de traitement",
  completedOrder: "Complété",
  blink: "blink",
};

const ClientItem = ({ client, handleClientClick, clientDetails }) => {
  const [isNotificationVisible, setNotificationVisible] = useState(false);

  useEffect(() => {
    // Vérifie si au moins un item a isClientNotified à false
    const hasUnnotifiedItems = client.orders.some((order) => !order.isClientNotified);
    setNotificationVisible(hasUnnotifiedItems);
  }, [client.orders]);

  const renderBadge = (orderType) => {
    if (client.orders.some((order) => order[orderType])) {
      const badgeClass = `admin-badge ${orderType}-badge`;
      return <span className={badgeClass}>{badgeMap[orderType]}</span>;
    }

    return null;
  };

  return (
    <li className={`client-item ${isNotificationVisible ? "notified" : ""}`}>
      <div className="client-header">
        <span>
          {client.firstName} {client.lastName}{" "}
        </span>
        {Object.keys(badgeMap).map((orderType) => renderBadge(orderType))}
        <button onClick={() => handleClientClick(client.id)}>
          {clientDetails[client.id] ? "Fermer" : "Consulter"}
        </button>
      </div>
      {isNotificationVisible && <div className="notification-bubble blink"></div>}
      {clientDetails[client.id] && <ClientDetails client={client} />}
    </li>
  );
};

export default ClientItem;
