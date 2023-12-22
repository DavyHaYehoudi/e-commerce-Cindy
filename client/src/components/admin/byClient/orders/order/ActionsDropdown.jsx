import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  cancelOrder,
  moveToNextStep,
  reactivateOrder,
} from "../../../../../features/admin/ordersSlice";
import { HiOutlineSquaresPlus } from "react-icons/hi2";
import { TbUserShare } from "react-icons/tb";
import { TbCircleCheck } from "react-icons/tb";
import { formatDate } from "../../../../../helpers/utils/formatDate";

const ActionsDropdown = ({
  order,
  step,
  client,
  handleSendToClient,
  isClientNotified,
  lastSentDateToClient,
}) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const isOrderCancelled = step === 6;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const performAction = (actionType, newStep) => {
    dispatch(
      actionType({
        clientId: client.id,
        orderId: order.id,
        isClientNotified: false,
        step: newStep,
        isNextStepOrder: true,
      })
    );
  };

  return (
    <div className={`dropdown ${isOpen ? "open" : "closed"}`}>
      <div className="orderControlContainer">
        {lastSentDateToClient && (
          <p>
            <small>
              Dernier envoi au client : {formatDate(lastSentDateToClient)}{" "}
            </small>{" "}
          </p>
        )}
        {isClientNotified ? (
          <p className="info-tooltip" aria-label="Client informé">
            {" "}
            <TbCircleCheck
              style={{ color: "var(--success)", fontSize: "25px" }}
            />
          </p>
        ) : (
          <p className="info-tooltip" aria-label="Client non informé">
            <TbUserShare
              style={{ color: "var(--danger)", fontSize: "25px" }}
              aria-hidden="true"
            />
          </p>
        )}
        <button
          className="account-btn toggle"
          onClick={toggleDropdown}
          aria-label="Liste d'actions possibles"
        >
          <HiOutlineSquaresPlus aria-hidden="true" />
        </button>
      </div>
      <div className="dropdown-menu" onClick={() => setIsOpen(false)}>
        {!isOrderCancelled && (
          <button onClick={() => performAction(moveToNextStep, step)}>
            Passer à l'étape suivante
          </button>
        )}
        {isOrderCancelled ? (
          <button onClick={() => performAction(reactivateOrder, 0)}>
            Réactiver la commande
          </button>
        ) : (
          <button onClick={() => performAction(cancelOrder, 6)}>
            Annuler la commande
          </button>
        )}
        <div className="dropdown-separator"></div>
        <button onClick={handleSendToClient}>
          Envoyer ces informations au client
        </button>
      </div>
    </div>
  );
};

export default ActionsDropdown;
