import React from "react";
import { MdEmail } from "react-icons/md";
import AdminNotes from "./AdminNotes";
import ClientPreferencesDetails from "../clientPreferences/ClientPreferencesDetails";
import ToggleButton from "../../dumbs/ToggleButton";
import AdminOrderItem from "../clientOrders/AdminOrderItem";

const ClientDetails = ({ client }) => {
  const handleAdminNotesUpdate = (notes) => {
    console.log("Notes administratives mises à jour :", notes);
  };

  return (
    <div className="client-details">
      <h2>Informations du client</h2>
      <p>Prénom : {client.firstName}</p>
      <p>Nom : {client.lastName}</p>
      <p className="client-details-email">
        Email :{" "}
        <a href={`mailto:${client.email}`}>
          {client.email} <MdEmail className="icon" />
        </a>
      </p>
      <p>Téléphone : {client.phone}</p>
      <p>Adresse : {client.shippingAddress}</p>

      <ToggleButton
        initialText="Afficher ses préférences"
        hiddenText="Fermer ses préférences"
        buttonClass="account-btn toggle"
        content={
          <div className="clientPreferenceDetails">
            <ClientPreferencesDetails client={client} />
          </div>
        }
      />

      <h2>Historique des commandes</h2>
      <p>Total des commandes : {client.totalOrders}</p>
      <p>Valeur totale des commandes : {client.totalOrderValue}</p>

      <ToggleButton
        initialText="Afficher ses commandes"
        hiddenText="Fermer ses commandes"
        buttonClass="account-btn toggle"
        content={
          <div className="clientOrders">
            {client.orders.map((order,i) => (
              <AdminOrderItem
                key={order.id}
                clientId={client.id}
                order={order}
                orderIndex={i}
              />
            ))}
          </div>
        }
      />

      <AdminNotes initialNotes="" onUpdateNotes={handleAdminNotesUpdate} />
    </div>
  );
};

export default ClientDetails;
