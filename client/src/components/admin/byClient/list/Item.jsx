import React from "react";
import { useSelector } from "react-redux";
import { getStepColor } from "../../../../helpers/getStepColor";
import Infos from "../presentation/Infos";

const Item = ({ client, handleClientClick, clientDetails }) => {
  const ordersStep = useSelector(
    (state) => state.ordersStep.find((user) => user.id === client.id)?.orders
  );

  const isAnyOrderClientNotified = ordersStep?.some((order) => !order.isClientNotified);

  const renderBadge = (step) => {
    const count = ordersStep?.filter((order) => order.step === step).length;

    if (count > 0) {
      const stepColor = getStepColor(step);
      const badgeClass = `admin-badge`;
      const style = { backgroundColor: stepColor };

      return (
        <span key={step} className={badgeClass} style={style}>
          {step} ({count})
        </span>
      );
    }

    return null;
  };

  return (
    <li className={`client-item ${isAnyOrderClientNotified ? "notified" : ""}`}>
      <div className="client-header">
        <span>
          {client.firstName} {client.lastName}{" "}
        </span>
        {ordersStep &&
          ordersStep.length > 0 &&
          [...new Set(ordersStep.map((order) => order.step))].map((step) =>
            renderBadge(step)
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
