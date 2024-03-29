import React from "react";
import { getProductProperties } from "../selectors/product";
import useConfirmation from "../components/admin/byClient/orders/product/item/action/hooks/useConfirmation";
import { useSelector } from "react-redux";

const ConfirmationModal = ({
  material,
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
  const collectionStore = useSelector((state) => state?.collection?.data);
  const categoryStore = useSelector((state) => state?.category?.data);
  const tagStore = useSelector((state) => state?.tag?.data);
  const productPrice = getProductProperties(
    productsId,
    productStore,
    collectionStore,
    categoryStore,
    tagStore,
    material
  )?.pricing?.currentPrice;
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
