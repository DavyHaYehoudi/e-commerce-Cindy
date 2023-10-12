import React from "react";
import ClientDetails from "../clientPresentation/ClientDetails";

const ClientItem = ({ client, handleClientClick, clientDetails }) => {
  return (
    <li>
      <div className="client-header">
        <span>
          {client.firstName} {client.lastName}{" "}
        </span>
        {client.orders.some((order) => order.newOrder) && (
          <span className="admin-badge new-order-badge">Nouveau</span>
        )}
        {client.orders.some((order) => order.inProcessingOrder) && (
          <span className="admin-badge inProcessing-order-badge">
            En cours de traitement
          </span>
        )}
        {client.orders.some((order) => order.pendingShipmentOrder) && (
          <span className="admin-badge pending-shipment-order-badge">
            En attente d'envoi
          </span>
        )}
        {client.orders.some((order) => order.dispatchedOrder) && (
          <span className="admin-badge dispatched-order-badge">Envoyé</span>
        )}
        <button onClick={() => handleClientClick(client.id)}>
          {clientDetails[client.id] ? "Fermer" : "Voir la fiche client"}
        </button>
      </div>
      {clientDetails[client.id] && <ClientDetails client={client} />}
    </li>
  );
};

export default ClientItem;
