import React from "react";
import { useSelector } from "react-redux";
import useConfirmation from "../pages/dashboardAdmin/admin/byClient/orders/product/item/action/hooks/useConfirmation";

const ConfirmationModal = ({
  message,
  confirmation,
  orderProductsActions,
  actions,
  orderId,
  orderProducts,
  amount,
  orderProductsInfo,
  setProductActions,
  setConfirmation,
  setEntryError,
  setInteraction,
}) => {
  const orderProductsStore = useSelector((state) => state?.orderProducts?.data);
  const { finalPrice } = orderProductsStore.find(
    (op) => op?._id === orderProducts?._id
  );
  const { isConfirmed, handleConfirmation, handleCancel } = useConfirmation({
    confirmation,
    orderProductsActions,
    actions,
    orderId,
    orderProducts,
    amount,
    finalPrice,
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
