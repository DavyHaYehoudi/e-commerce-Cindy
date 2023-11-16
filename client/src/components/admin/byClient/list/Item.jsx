import React from "react";
import { useSelector } from "react-redux";
import Infos from "../presentation/Infos";
import { getClientItemInfo } from "../../../../helpers/storeDataUtils";

const Item = ({ client, handleClientClick, clientDetails }) => {
  const state = useSelector((state) => state.ordersStep);
  const { ordersStep, isAnyOrderClientNotified, renderBadge } = getClientItemInfo(state, client);

  return (
    <li className={`client-item ${isAnyOrderClientNotified ? "notified" : ""}`}>
      <div className="client-header">
        <span>
          {client.firstName} {client.lastName}{" "}
        </span>
        {ordersStep &&
          ordersStep.length > 0 &&
          [...new Set(ordersStep.map((order) => order.step))].map((step) =>
            renderBadge(step).stepBadge
          )}
        <button onClick={() => handleClientClick(client.id)}>
          {clientDetails[client.id] ? "Fermer" : "Consulter"}
        </button>
      </div>
      {isAnyOrderClientNotified && <div className="notification-bubble blink"></div>}
      {clientDetails[client.id] && <Infos client={client} />}
    </li>
  );
};

export default Item;
