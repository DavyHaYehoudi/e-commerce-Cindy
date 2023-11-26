import React from "react";
import { useSelector } from "react-redux";
import Infos from "../presentation";
import { getClientItemInfo } from "../../../../helpers/storeDataUtils";

const Item = ({ client, handleClientClick, clientDetails }) => {
  const state = useSelector((state) => state.ordersStep);
  const { orders, isAnyOrderClientNotified } = getClientItemInfo(state, client);

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
          handleClientClick={handleClientClick}
        />
      )}
    </li>
  );
};

export default Item;
