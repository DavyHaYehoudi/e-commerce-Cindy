import React from "react";
import ClientDetails from "./ClientDetails";

const ClientItem = ({
  client,
  handleClientClick,
  clientDetails,
  handleStatusChange,
}) => {
  return (
    <li>
      <div
        className="client-header"
        onClick={() => handleClientClick(client.id)}
      >
        <span>{client.name}</span>
        {client.orders.some((order) => order.nonTraitee) && (
          <span className="non-traitee-badge">Non traitée</span>
        )}
        <button>
          {clientDetails[client.id]
            ? "Fermer les détails"
            : "Afficher les détails"}
        </button>
      </div>
      {clientDetails[client.id] && (
        <ClientDetails
          client={client}
          handleStatusChange={handleStatusChange}
        />
      )}
    </li>
  );
};

export default ClientItem;
