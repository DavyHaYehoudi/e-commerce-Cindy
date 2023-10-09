import React from "react";
import { formatDate } from "../../helpers/formatDate";
import { getStatusColor } from "../../helpers/getStatusColor";
import OrderProductsList from "./OrderProductsList";

const OrderItem = ({ client, order, handleStatusChange }) => {
  return (
    <div className="admin-order-item">
      <p>Date de commande : {formatDate(order.date)}</p>
      <p>
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
      <p>Total de la commande : {order.totalAmount}</p>

      <h3>Produits de la commande :</h3>
      <OrderProductsList products={order.products} />
      <div className="admin-order-next-step">
        <button
          className="move-to-next-step"
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
    </div>
  );
};

export default OrderItem;
