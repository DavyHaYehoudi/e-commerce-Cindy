import React from "react";
import { formatDate } from "../../helpers/formatDate";
import { getStatusColor } from "../../helpers/getStatusColor";
import OrderProductsList from "./OrderProductsList";
import { Link } from "react-router-dom";
import { orderStatus } from "../../mocks/orderStatus";
import { ordersMock } from "../../mocks/ordersMock";
import { userInfo } from "../../mocks/userInfo";

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
      <p>
        {order.paymentMethod["cardType"]} se terminant par :{" "}
        {order.paymentMethod["last4Digits"]}{" "}
      </p>

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

      {order.status === orderStatus[2].name && (
        <div>
          <Link
            to={`/admin/generate-invoice/${order.id}`}
            state={{ order: ordersMock[0], user: userInfo }}
          >
            <button className="account-display-toggle-btn">
              Générer la facture
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrderItem;
