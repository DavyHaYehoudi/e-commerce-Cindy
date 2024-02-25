import React from "react";
import { getProductProperties } from "../selectors/product";
import useConfirmation from "../components/admin/byClient/orders/product/item/action/hooks/useConfirmation";
 
const ConfirmationModal = ({
  message,
  confirmation,
  orderProductsActions,
  actions,
  productsId,
  orderId,
  orderProducts,
  amount,
  productStore,
  orderProductsInfo,
  setProductActions,
  setConfirmation,
  setEntryError,
  setInteraction,
}) => {
  const productPrice = getProductProperties(productsId, productStore)?.pricing?.currentPrice;
  const { isConfirmed, handleConfirmation, handleCancel } = useConfirmation({
    confirmation,
    orderProductsActions,
    actions,
    orderId,
    orderProducts,
    amount,
    productPrice,
    orderProductsInfo,
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
