import React, { useState } from "react";
import Item from "./Item";
import ToggleButton from "../../../shared/ToggleButton";
import { formatDate } from "../../../helpers/formatDate";
import OrderStep from "../../../shared/OrderStep";
import { orderStep } from "../../../constants/orderStep";

const List = ({ orderHistory, filter }) => {
  const [showOrderItems, setShowOrderItems] = useState(false);

  const handleToggleOrderItems = () => {
    setShowOrderItems(!showOrderItems);
  };

  return (
    <div className="other-orders">
      {orderHistory.filter(filter).map((order) => (
        <div key={order.id} className="order-item-wrapper-user-account">
          <div className="date-step">
            <div className="date-step date-header">
              <span>Date de commande : {formatDate(order.date)}</span>
              <OrderStep order={order} />
            </div>
            <p>
              № suivi de commande :{" "}
              {order.trackingNumberAdmin || "Non disponible"}{" "}
            </p>
          </div>

          <ToggleButton
            initialText="Afficher les articles"
            hiddenText="Fermer les articles"
            buttonClass="account-btn toggle"
            content={
              <Item
                products={order.products}
                isReturnProduct={order.step === orderStep[3].name}
              />
            }
            onToggle={handleToggleOrderItems}
          />

          {showOrderItems && (
            <p>
              Prix total : {order.inTotalAmount} <br /> Moyen de paiement :{" "}
              {order.paymentMethod["cardType"]} se terminant par :{" "}
              {order.paymentMethod["last4Digits"]}{" "}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default List;
