import React from "react";
import Infos from "../presentation";
import { getClientInfo } from "../../../../selectors/client";
import { useSelector } from "react-redux";

const Item = ({ client, handleClientClick, clientDetails }) => {
  const { orders, isToProcessOrNotNotified } = useSelector((state) =>
    getClientInfo(state, {
      client,
      isClientNotified: state?.orders?.isClientNotified,
    })
  );

  return (
    <li
      className={`client-item ${isToProcessOrNotNotified ? "notified" : ""}`}
      data-testid={`client-row-${client._id}`}
    >
      <div className="client-header">
        <span
          className="client-header-clic"
          onClick={() => handleClientClick(client._id)}
          data-testid={`client-name-${client._id}`}
        >
          {client.firstName + " " + client.lastName}
        </span>
          {isToProcessOrNotNotified && (
            <span
              className="notification-bubble-list blink"
              data-testid="notification-bubble"
            ></span>
          )}
      </div>
      {clientDetails[client._id] && (
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
