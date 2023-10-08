// AdminDashboard.jsx
import React, { useState } from "react";
import { adminDashboard } from "../mocks/adminDashboard";
import ClientList from "../components/admin/ClientList";

const AdminDashboard = () => {
  const [clients, setClients] = useState(adminDashboard);
  const [clientDetails, setClientDetails] = useState({});

  const handleClientClick = (clientId) => {
    setClientDetails((prevDetails) => ({
      ...prevDetails,
      [clientId]: !prevDetails[clientId],
    }));
  };
  const handleStatusChange = (clientId, orderId, currentStatus) => {
    const nextStatus =
      currentStatus === "En attente"
        ? "En cours de préparation"
        : currentStatus === "En cours de préparation"
        ? "Expédiée"
        : currentStatus === "Expédiée"
        ? "Annulée"
        : "En attente";

    // Mettez à jour le statut de la commande dans votre backend
    // ...

    // Pour l'exemple, nous allons mettre à jour le statut dans le mock directement
    const updatedClients = clients.map((client) => {
      if (client.id === clientId) {
        const updatedOrders = client.orders.map((order) => {
          if (order.id === orderId) {
            return { ...order, status: nextStatus };
          }
          return order;
        });
        return { ...client, orders: updatedOrders };
      }
      return client;
    });

    // Mettez à jour l'état avec les nouvelles données
    setClients(updatedClients);
  };
  return (
    <div className="admin-dashboard">
      <ClientList
        clients={clients}
        handleClientClick={handleClientClick}
        clientDetails={clientDetails}
        handleStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default AdminDashboard;
