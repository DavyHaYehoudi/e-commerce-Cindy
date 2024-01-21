import React from "react";
import Infos from "../presentation";
import { getClientInfo } from "../../../../selectors/client";
import { useSelector } from "react-redux";

const Item = ({ client, handleClientClick, clientDetails }) => {
  const { orders, isAnyOrderClientNotified } = useSelector((state) =>
  getClientInfo(state, { client })
  );

  return (
    <li
      className={`client-item ${isAnyOrderClientNotified ? "notified" : ""}`}
      data-testid={`client-row-${client.id}`}
    >
      <div className="client-header">
        <p
          className="client-header-clic"
          onClick={() => handleClientClick(client.id)}
          data-testid={`client-name-${client.id}`}
        >
          {client.firstName + " " +client.lastName}
          {isAnyOrderClientNotified && (
            <span
              className="notification-bubble-list blink"
              data-testid="notification-bubble"
            ></span>
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
