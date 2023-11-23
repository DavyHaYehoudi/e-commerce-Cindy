import React from "react";
import {
  handleCancel,
  handleConfirmation,
} from "../components/admin/byClient/orders/product/item/action/handler/confirmation";
import { useDispatch } from "react-redux";

const ConfirmationModal = ({
  message,
  confirmation,
  productActions,
  actions,
  clientId,
  productId,
  orderId,
  setProductActions,
  setConfirmation,
  setEntryError,
  setInteraction,
}) => {
  const dispatch = useDispatch();
  return (
    <div className="confirmation-popup">
      <span>{message}</span>
      <button
        onClick={() =>
          handleConfirmation(
            confirmation,
            productActions,
            actions,
            clientId,
            productId,
            orderId,
            dispatch,
            setConfirmation,
            setEntryError,
            setProductActions
          )
        }
      >
        Confirmer
      </button>
      <button onClick={() => handleCancel(setConfirmation, setInteraction)}>
        Annuler
      </button>
    </div>
  );
};

export default ConfirmationModal;
