import React from "react";
import { formatDate } from "../../helpers/formatDate";

const OtherOrders = ({ orderHistory, getStatusColor }) => {
  return (
    <div className="other-orders">
      <h3>Autres Commandes</h3>
      {orderHistory
        .filter(
          (order) =>
            order.status !== "Expédiée" && order.status !== "Livrée"
        )
        .map((order) => (
          <div key={order.id} className="order-item">
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
          </div>
        ))}
    </div>
  );
};

export default OtherOrders;
