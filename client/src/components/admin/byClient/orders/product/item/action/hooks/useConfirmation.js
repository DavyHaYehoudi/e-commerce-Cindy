import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteCredit } from "../../../../../../../../features/admin/creditSlice";
import { updateOrder } from "../../../../../../../../features/admin/ordersSlice";
import { updateActionContent } from "../../../../../../../../features/admin/productsByOrderSlice";

const useConfirmation = ({
  confirmation,
  productsByOrderActions,
  actions,
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
        updateOrder({
          orderId,
          amount,
          movement: "outCancel",
          actionType: "totalsInOut",
        })
      );
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
          updatedProperty: "credit",
          isClientNotified: false,
          productsByOrderId: productsByOrder._id,
        })
      );
    }

    if (confirmAction) {
      dispatch(
        updateActionContent({
          productsByOrderId: productsByOrder._id,
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

    if (confirmAction === actions.REFUND) {
      dispatch(
        updateOrder({
          orderId,
          amount: productsByOrderInfo?.refund * productPrice,
          movement: "outCancel",
          actionType: "totalsInOut",
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
