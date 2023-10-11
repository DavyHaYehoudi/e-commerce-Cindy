import React, { useState } from "react";
import OrderItems from "./OrderItems";
import ToggleButton from "../dumbs/ToggleButton";
import { formatDate } from "../../helpers/formatDate";

const OrderList = ({ orderHistory, getStatusColor, filter, title }) => {
  const [showOrderItems, setShowOrderItems] = useState(false);

  const handleToggleOrderItems = () => {
    setShowOrderItems(!showOrderItems);
  };

  return (
    <div className="other-orders">
      <h3>{title}</h3>
      {orderHistory.filter(filter).map((order) => (
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

          <ToggleButton
            initialText="Afficher les articles"
            hiddenText="Fermer les articles"
            buttonClass="account-btn toggle"
            content={
              <OrderItems
                products={order.products}
                image={order.products[0].image}
              />
            }
            onToggle={handleToggleOrderItems}
          />

          {showOrderItems && (
            <p>
              Prix total : {order.totalAmount} <br /> Moyen de paiement :{" "}
              {order.paymentMethod["cardType"]} se terminant par :{" "}
              {order.paymentMethod["last4Digits"]}{" "}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default OrderList;
