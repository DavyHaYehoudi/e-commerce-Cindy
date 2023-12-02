import React from "react";
import Infos from "../presentation";
import { getClientItemInfo } from "../../../../helpers/storeDataUtils";

const Item = ({
  client,
  ordersActionsStore,
  handleClientClick,
  clientDetails,
}) => {
  const { orders, isAnyOrderClientNotified } = getClientItemInfo(
    ordersActionsStore,
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
          ordersActionsStore={ordersActionsStore}
          handleClientClick={handleClientClick}
        />
      )}
    </li>
  );
};

export default Item;
