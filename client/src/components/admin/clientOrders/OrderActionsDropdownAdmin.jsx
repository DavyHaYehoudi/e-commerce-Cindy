import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  cancelOrder,
  moveToNextStep,
  reactivateOrder,
} from "../../../features/orderStepSlice";
import { orderStep } from "../../../mocks/orderStep";

const OrderActionsDropdownAdmin = ({ order, step, handleSendToClient }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const isOrderCancelled = step === orderStep[6].name;
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleMoveToNextStep = () => {
    console.log('step :',step);
    dispatch(
      moveToNextStep({
        orderId: order.id,
        isClientNotified: false,
        step,
        isNextStepOrder: true,
      })
    );
    setIsOpen(false);
  };

  const handleCancelOrder = () => {
    dispatch(
      cancelOrder({
        orderId: order.id,
        isClientNotified: false,
        step: orderStep[6].name,
      })
    );
    setIsOpen(false);
  };
  const handleReactivateOrder = () => {
    dispatch(
      reactivateOrder({
        orderId: order.id,
        isClientNotified: false,
        step: orderStep[0].name,
      })
    );
    setIsOpen(false);
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
      <button className="dropdown-toggle" onClick={toggleDropdown}>
        ...
      </button>
      <div className="dropdown-menu">
        {!isOrderCancelled && (
          <button onClick={() => handleMoveToNextStep()}>
            Passer à l'étape suivante
          </button>
        )}
        {isOrderCancelled ? (
          <button onClick={() => handleReactivateOrder()}>
            Réactiver la commande
          </button>
        ) : (
          <button onClick={() => handleCancelOrder()}>
            Annuler la commande
          </button>
        )}
        <div className="dropdown-separator"></div>
        <button onClick={handleSendToClient}>Envoyer la fiche au client</button>
      </div>
    </div>
  );
};

export default OrderActionsDropdownAdmin;
