import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  isClientNotified,
  totalsInOut,
} from "../../../../../../../../../features/admin/ordersSlice";
import { deleteCredit } from "../../../../../../../../../features/admin/creditSlice";
import { updateActionContent } from "../../../../../../../../../features/admin/orderProductsSlice";

const useConfirmation = ({
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
}) => {
  const dispatch = useDispatch();
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleConfirmation = () => {
    const { confirmAction } = confirmation;

    const updateProductActions = (confirmAction) => {
      const dynamicProductActions = {
        ...Object.fromEntries(
          Object.entries(orderProductsActions).map(([key, value]) => [
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
      dispatch(deleteCredit({ orderProductsId: orderProducts._id }));
      dispatch(
        updateActionContent({
          creditContent: null,
          orderProductsId: orderProducts._id,
          updatedProperty: "credit",
        })
      );
    }

    if (confirmAction) {
      dispatch(
        updateActionContent({
          orderProductsId: orderProducts._id,
          orderId,
          updatedProperty: confirmAction,
          productActionContent: null,
        })
      );
      dispatch(isClientNotified({ orderId }));
      updateProductActions(confirmAction);
    }

    setConfirmation((prevState) => ({
      ...prevState,
      confirmAction: null,
      isConfirmationVisible: false,
    }));

    if (confirmAction === actions.REFUND) {
      dispatch(
        totalsInOut({
          orderId,
          amount: orderProductsInfo?.refund * finalPrice,
          movement: "outCancel",
        })
      );
    }
    dispatch(isClientNotified({ orderId }));
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
