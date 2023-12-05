import React from "react";
import Infos from "../presentation";
import { getClientinfo } from "../../../../helpers/selectors/client";

const Item = ({
  client,
  ordersStore,
  productsStore,
  handleClientClick,
  clientDetails,
}) => {

  const { orders, isAnyOrderClientNotified } = getClientinfo(
    ordersStore,
    client
  );

  return (
    <li className={`client-item ${isAnyOrderClientNotified ? "notified" : ""}`}>
      <div className="client-header">
        <p
          className="client-header-clic"
          onClick={() => handleClientClick(client.id)}
        >
          {client.firstName} {client.lastName}{" "}
          {isAnyOrderClientNotified && (
            <span className="notification-bubble-list blink"></span>
          )}
        </p>
      </div>
      {clientDetails[client.id] && (
        <Infos
          client={client}
          orders={orders}
          ordersStore={ordersStore}
          productsStore={productsStore}
          handleClientClick={handleClientClick}
        />
      )}
    </li>
  );
};

export default Item;
