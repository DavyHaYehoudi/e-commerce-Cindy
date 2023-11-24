import React from "react";
import {
  handleCancel,
  handleConfirmation,
} from "../components/admin/byClient/orders/product/item/action/handler/confirmation";
import { useDispatch } from "react-redux";
import { getProductProperties } from "../helpers/storeDataUtils";

const ConfirmationModal = ({
  message,
  confirmation,
  productActions,
  actions,
  clientId,
  productId,
  orderId,
  productsState,
  productState,
  setProductActions,
  setConfirmation,
  setEntryError,
  setInteraction,
}) => {
  const dispatch = useDispatch();
  const productPrice = getProductProperties(productId, productsState).pricing
    .currentPrice;
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
            productPrice,
            productState,
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
