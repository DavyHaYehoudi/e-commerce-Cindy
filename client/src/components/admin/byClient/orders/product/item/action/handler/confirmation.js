import { articleAction, totalsInOut } from "../../../../../../../../features/admin/ordersSlice";
import {
  updateActionContent,
} from "../../../../../../../../features/admin/productsSlice";

// Confirmation d'une annulation de champ
export const handleConfirmation = (
  confirmation,
  productsActions,
  actions,
  clientId,
  productId,
  orderId,
  dispatch,
  productPrice,
  productsInfo,
  setConfirmation,
  setEntryError,
  setProductActions
) => {
  const { confirmAction } = confirmation;
  const updateProductActions = (confirmAction) => {
    const dynamicProductActions = {
      ...Object.fromEntries(
        Object.entries(productsActions).map(([key, value]) => [
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
    setConfirmation((prevState) => ({
      ...prevState,
      isConfirmationVisible: false,
    }));
    setEntryError("");
    dispatch(
      totalsInOut({
        orderId,
        amount: productsInfo?.credit?.amount,
        movement: "outCancel",
      })
    );
    dispatch(articleAction({ clientId, orderId }));
    return dispatch(
      updateActionContent({
        productId,
        updatedProperty: "credit",
        isClientNotified: false,
        productActionContent: { amount: null, dateExpire: null, code: null },
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
    setConfirmation((prevState) => ({
      ...prevState,
      confirmAction: null,
      isConfirmationVisible: false,
    }));
  }
  dispatch(articleAction({ clientId, orderId }));
  if (confirmAction === actions.REFUND) {
    dispatch(
      totalsInOut({
        orderId,
        amount: productsInfo?.refund * productPrice,
        movement: "outCancel",
      })
    );
  }
};

// Infirmer l'annulation
export const handleCancel = (setConfirmation, setInteraction) => {
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
