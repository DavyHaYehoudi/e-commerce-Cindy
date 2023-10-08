import React from "react";
import OrderItem from "./OrderItem";
import { MdEmail } from "react-icons/md";

const ClientDetails = ({ client, handleStatusChange }) => {
  return (
    <div className="client-details">
      <h2>Informations du client</h2>
      <p>Nom: {client.name}</p>
      <p className="client-details-email">
       Email:{" "} 
        <a href={`mailto:${client.email}`}>
          {client.email} <MdEmail className="icon"/>
        </a>
      </p>
      <p>Téléphone: {client.phone}</p>
      <p>Adresse: {client.address}</p>

      <h2>Historique des commandes</h2>
      <p>Total des commandes: {client.totalOrders}</p>
      <p>Valeur totale des commandes: {client.totalOrderValue}</p>

      {client.orders.map((order) => (
        <OrderItem
          key={order.id}
          client={client}
          order={order}
          handleStatusChange={handleStatusChange}
        />
      ))}
    </div>
  );
};

export default ClientDetails;
