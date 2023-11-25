import React from "react";
import { useSelector } from "react-redux";
import Infos from "../presentation/Infos";
import { getClientItemInfo } from "../../../../helpers/storeDataUtils";

const Item = ({ client, handleClientClick, clientDetails }) => {
  const state = useSelector((state) => state.ordersStep);
  const { orders, isAnyOrderClientNotified, renderBadge } = getClientItemInfo(
    state,
    client
  );

  return (
    <li
      className={`client-item ${isAnyOrderClientNotified ? "notified" : ""}`}
      onClick={() => handleClientClick(client.id)}
    >
      <div className="client-header">
        <span>
          {client.firstName} {client.lastName}{" "}
        </span>
        {orders &&
          orders.length > 0 &&
          [...new Set(orders.map((order) => order.step))].map(
            (step) => renderBadge(step).stepBadge
          )}
      </div>
      {isAnyOrderClientNotified && (
        <div className="notification-bubble-list blink"></div>
      )}
      {clientDetails[client.id] && (
        <Infos
          client={client}
          orders={orders}
          handleClientClick={handleClientClick}
        />
      )}
    </li>
  );
};

export default Item;
