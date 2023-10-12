import React from "react";
import ClientDetails from "../clientPresentation/ClientDetails";

const ClientItem = ({
  client,
  handleClientClick,
  clientDetails,
}) => {
  return (
    <li>
      <div
        className="client-header"
        onClick={() => handleClientClick(client.id)}
      >
        <span>{client.firstName}{" "}{client.lastName} </span>
        {client.orders.some((order) => order.isOrderModified) && (
          <span className="admin-badge modified-badge">Modifiée</span>
        )}
        {client.orders.some((order) => order.newOrder) && (
          <span className="admin-badge new-order-badge">Nouvelle</span>
        )}
        <button>
          {clientDetails[client.id]
            ? "Fermer"
            : "Voir la fiche client"}
        </button>
      </div>
      {clientDetails[client.id] && (
        <ClientDetails
          client={client}
        />
      )}
    </li>
  );
};

export default ClientItem;
