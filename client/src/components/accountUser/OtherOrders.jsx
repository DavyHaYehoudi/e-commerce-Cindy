import React from "react";
import { formatDate } from "../../helpers/formatDate";
import OrderItems from "./OrderItems";
import { orderStatus } from "../../mocks/orderStatus";

const OtherOrders = ({ orderHistory, getStatusColor }) => {
  return (
    <div className="other-orders">
      <h3>Autres Commandes</h3>
      {orderHistory
        .filter(
          (order) =>
            order.status !== orderStatus[2].name
        )
        .map((order) => (
          <div key={order.id} className="order-item">
            <p>Date de commande : {formatDate(order.date)}</p>
            <OrderItems items={order.items} />
            <p>Prix total : {order.totalAmount} </p>
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
          </div>
        ))}
    </div>
  );
};

export default OtherOrders;
