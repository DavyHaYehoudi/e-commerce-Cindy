import React, { useState } from "react";
import OrderItem from "./OrderItem";
import { MdEmail } from "react-icons/md";
import AdminNotes from "./AdminNotes";
import ClientPreferencesDetails from "./ClientPreferencesDetails";

const ClientDetails = ({ client, handleStatusChange }) => {
  const [showDetails, setShowDetails] = useState(false);
  const handleAdminNotesUpdate = (notes) => {
    // Mettez à jour les notes administratives dans votre logique
    console.log("Notes administratives mises à jour :", notes);
  };
  const handleDetailsToggle = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="client-details">
      <h2>Informations du client</h2>
      <p>Nom : {client.name}</p>
      <p className="client-details-email">
        Email :{" "}
        <a href={`mailto:${client.email}`}>
          {client.email} <MdEmail className="icon" />
        </a>
      </p>
      <p>Téléphone : {client.phone}</p>
      <p>Adresse : {client.shippingAddress}</p>
      <button onClick={handleDetailsToggle}>Afficher les détails</button>
      {showDetails && (
        <div className="clientPreferenceDetails">
          <ClientPreferencesDetails client={client} />
        </div>
      )}

      <h2>Historique des commandes</h2>
      <p>Total des commandes : {client.totalOrders}</p>
      <p>Valeur totale des commandes : {client.totalOrderValue}</p>

      {client.orders.map((order) => (
        <OrderItem
          key={order.id}
          client={client}
          order={order}
          handleStatusChange={handleStatusChange}
        />
      ))}

      <AdminNotes initialNotes="" onUpdateNotes={handleAdminNotesUpdate} />
    </div>
  );
};

export default ClientDetails;
