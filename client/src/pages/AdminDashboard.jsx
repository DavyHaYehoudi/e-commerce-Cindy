import React, { useState } from "react";
import { formatDate } from "../helpers/formatDate";
import { getStatusColor } from "../helpers/getStatusColor";
import { adminDashboard } from "../mocks/adminDashboard";

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
      <div className="client-list">
        <h2>Liste des clients</h2>
        <ul>
          {clients.map((client) => (
            <li key={client.id}>
              <div
                className="client-header"
                onClick={() => handleClientClick(client.id)}
              >
                <span>{client.name}</span>
                <button>
                  {clientDetails[client.id]
                    ? "Fermer les détails"
                    : "Afficher les détails"}
                </button>
              </div>
              {clientDetails[client.id] && (
                <div className="client-details">
                  <h2>Informations du client</h2>
                  <p>Nom: {client.name}</p>
                  <p>Email: {client.email}</p>
                  <p>Téléphone: {client.phone}</p>
                  <p>Adresse: {client.address}</p>

                  <h2>Historique des commandes</h2>
                  <p>Total des commandes: {client.totalOrders}</p>
                  <p>Valeur totale des commandes: {client.totalOrderValue}</p>

                  {client.orders.map((order) => (
                    <div key={order.id} className="admin-order-item">
                      <p>Date de commande: {formatDate(order.date)}</p>
                      <p>
                        Statut:{" "}
                        <span
                          style={{
                            backgroundColor: getStatusColor(order.status),
                            color: "#fff",
                            padding: "5px",
                            borderRadius: "5px",
                          }}
                        >
                          {order.status}
                        </span>
                      </p>
                      <p>Total de la commande: {order.total}</p>
                      <button
                        onClick={() =>
                          handleStatusChange(
                            client.id,
                            order.id,
                            order.status // Utilisez le statut actuel de la commande
                          )
                        }
                      >
                        Passer à l'étape suivante
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
