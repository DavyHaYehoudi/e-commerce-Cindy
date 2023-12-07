import React from "react";
import { getProductProperties } from "../selectors/product";
import useConfirmation from "../components/admin/byClient/orders/product/item/action/hooks/useConfirmation";

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
  const productPrice = getProductProperties(productId, productStore).pricing
    .currentPrice;
  const { isConfirmed, handleConfirmation, handleCancel } = useConfirmation({
    confirmation,
    productsActions,
    actions,
    clientId: client.id,
    productId,
    orderId,
    products,
    amount,
    productPrice,
    productsInfo,
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
