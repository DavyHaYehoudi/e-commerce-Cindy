import React from "react";
import {
  handleCancel,
  handleConfirmation,
} from "../components/admin/byClient/orders/product/item/action/handler/confirmation";
import { useDispatch } from "react-redux";
import { getProductProperties } from "../helpers/selectors/product";

const ConfirmationModal = ({
  message,
  confirmation,
  productsActions,
  actions,
  client,
  productId,
  orderId,
  products,
  amount,
  productStore,
  productsInfo,
  setProductActions,
  setConfirmation,
  setEntryError,
  setInteraction,
}) => {
  const dispatch = useDispatch();
  const productPrice = getProductProperties(productId, productStore).pricing
    .currentPrice;
  return (
    <div className="confirmation-popup">
      <span>{message}</span>
      <button
        onClick={() =>
          handleConfirmation(
            confirmation,
            productsActions,
            actions,
            client.id,
            productId,
            orderId,
            products,
            amount,
            dispatch,
            productPrice,
            productsInfo,
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
