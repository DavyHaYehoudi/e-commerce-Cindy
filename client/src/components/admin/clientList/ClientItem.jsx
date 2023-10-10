import React from "react";
import ClientDetails from "../clientPresentation/ClientDetails";

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
        <span>{client.firstName}{" "}{client.lastName} </span>
        {client.orders.some((order) => order.nonTraitee) && (
          <span className="non-traitee-badge">Non traitée</span>
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
          handleStatusChange={handleStatusChange}
        />
      )}
    </li>
  );
};

export default ClientItem;
