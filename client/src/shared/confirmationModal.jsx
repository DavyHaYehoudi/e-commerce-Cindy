import React from "react";
import { getProductProperties } from "../selectors/product";
import useConfirmation from "../components/admin/byClient/orders/product/item/action/hooks/useConfirmation";

const ConfirmationModal = ({
  message,
  confirmation,
  productsByOrderActions,
  actions,
  client,
  productId,
  orderId,
  productsByOrder,
  amount,
  productStore,
  productsByOrderInfo,
  setProductActions,
  setConfirmation,
  setEntryError,
  setInteraction,
}) => {
  const productPrice = getProductProperties(productId, productStore)?.pricing?.currentPrice;
  const { isConfirmed, handleConfirmation, handleCancel } = useConfirmation({
    confirmation,
    productsByOrderActions,
    actions,
    clientId: client._id,
    productId,
    orderId,
    productsByOrder,
    amount,
    productPrice,
    productsByOrderInfo,
    setProductActions,
    setConfirmation,
    setEntryError,
    setInteraction,
  });

  return (
    <div className="confirmation-popup">
      <span>{message}</span>
      <button onClick={handleConfirmation} disabled={isConfirmed}>
        Confirmer
      </button>
      <button onClick={handleCancel}>Annuler</button>
    </div>
  );
};

export default ConfirmationModal;
