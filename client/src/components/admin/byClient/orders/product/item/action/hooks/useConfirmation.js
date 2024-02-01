import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteCredit } from "../../../../../../../../features/admin/creditSlice";
import {
  articleAction,
  totalsInOut,
} from "../../../../../../../../features/admin/ordersSlice";
import { updateActionContent } from "../../../../../../../../features/admin/productsByOrderSlice";

const useConfirmation = ({
  confirmation,
  productsByOrderActions,
  actions,
  clientId,
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
}) => {
  const dispatch = useDispatch();
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleConfirmation = () => {
    const { confirmAction } = confirmation;

    const updateProductActions = (confirmAction) => {
      const dynamicProductActions = {
        ...Object.fromEntries(
          Object.entries(productsByOrderActions).map(([key, value]) => [
            key,
            key.startsWith("isAdd") ? key === confirmAction : value,
          ])
        ),
      };
      setProductActions((prevState) => ({
        ...prevState,
        ...dynamicProductActions,
      }));
    };

    if (confirmAction === actions.CREDIT) {
      setProductActions((prevState) => ({
        ...prevState,
        isAddCredit: false,
        creditContent: { amount: null, dateExpire: null, code: null },
      }));
      setEntryError("");
      dispatch(
        totalsInOut({
          orderId,
          amount,
          movement: "outCancel",
        })
      );
      dispatch(articleAction({ clientId, orderId }));
      dispatch(
        deleteCredit({
          productsByOrderId: productsByOrder._id,
          orderId,
          amount,
        })
      );
      dispatch(
        updateActionContent({
          creditContent: null,
          productId,
          updatedProperty: "credit",
          isClientNotified: false,
        })
      );
    }

    if (confirmAction) {
      dispatch(
        updateActionContent({
          clientId,
          productId,
          orderId,
          updatedProperty: confirmAction,
          isClientNotified: false,
          productActionContent: null,
        })
      );
      updateProductActions(confirmAction);
    }

    setConfirmation((prevState) => ({
      ...prevState,
      confirmAction: null,
      isConfirmationVisible: false,
    }));

    dispatch(articleAction({ clientId, orderId }));

    if (confirmAction === actions.REFUND) {
      dispatch(
        totalsInOut({
          orderId,
          amount: productsByOrderInfo?.refund * productPrice,
          movement: "outCancel",
        })
      );
    }

    setIsConfirmed(true);
  };

  const handleCancel = () => {
    setConfirmation((prevState) => ({
      ...prevState,
      isConfirmationVisible: false,
      confirmAction: null,
    }));
    setInteraction((prevState) => ({
      ...prevState,
      activeLi: null,
    }));
  };

  return {
    isConfirmed,
    handleConfirmation,
    handleCancel,
  };
};

export default useConfirmation;
