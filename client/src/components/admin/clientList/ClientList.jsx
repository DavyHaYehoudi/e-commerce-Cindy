import React from "react";
import ClientItem from "./ClientItem";

const ClientList = ({
  clients,
  handleClientClick,
  clientDetails,
  handleStatusChange,
}) => {
  return (
    <div className="client-list">
      <h2>Liste des clients</h2>
      <ul>
        {clients.map((client) => (
          <ClientItem
            key={client.id}
            client={client}
            handleClientClick={handleClientClick}
            clientDetails={clientDetails}
            handleStatusChange={handleStatusChange}
          />
        ))}
      </ul>
    </div>
  );
};

export default ClientList;
