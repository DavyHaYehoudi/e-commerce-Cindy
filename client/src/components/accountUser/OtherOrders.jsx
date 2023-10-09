import React from "react";
import { formatDate } from "../../helpers/formatDate";
import OrderItems from "./OrderItems";
import { orderStatus } from "../../mocks/orderStatus";

const OtherOrders = ({ orderHistory, getStatusColor }) => {
  return (
    <div className="other-orders">
      <h3>Autres Commandes</h3>
      {orderHistory
        .filter((order) => order.status !== orderStatus[2].name)
        .map((order) => (
          <div key={order.id} className="order-item-wrapper-user-account">
            <div className="date-status">
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
              <p>
                № suivi de commande : {order.trackingNumber || "Non disponible"}{" "}
              </p>
            </div>
            <OrderItems
              products={order.products}
              image={order.products[0].image}
            />
            <p>
              Prix total : {order.totalAmount} <br /> Moyen de paiement :{" "}
              {order.paymentMethod["cardType"]}{" "}
              {order.paymentMethod["last4Digits"]}{" "}
            </p>
          </div>
        ))}
    </div>
  );
};

export default OtherOrders;
