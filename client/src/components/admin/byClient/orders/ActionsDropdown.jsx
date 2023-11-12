import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  cancelOrder,
  moveToNextStep,
  reactivateOrder,
} from "../../../../features/admin/orderStepSlice";
import { orderStep } from "../../../../constants/orderStep";
import { HiOutlineSquaresPlus } from "react-icons/hi2";
import { TbUserShare } from "react-icons/tb";
import { TbCircleCheck } from "react-icons/tb";
import { formatDate } from "../../../../helpers/formatDate";

const ActionsDropdown = ({
  order,
  step,
  handleSendToClient,
  isClientNotified,
  lastSentDateToClient,
}) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const isOrderCancelled = step === orderStep[6].name;
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const performAction = (actionType, newStep) => {
    dispatch(
      actionType({
        orderId: order.id,
        isClientNotified: false,
        step: newStep,
        isNextStepOrder: true,
      })
    );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className={`dropdown ${isOpen ? "open" : "closed"}`}>
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
          <button
            onClick={() => performAction(reactivateOrder, orderStep[0].name)}
          >
            Réactiver la commande
          </button>
        ) : (
          <button onClick={() => performAction(cancelOrder, orderStep[6].name)}>
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
