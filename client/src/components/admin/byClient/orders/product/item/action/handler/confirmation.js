import {
  updateActionContent,
  updateTotalsInOut,
} from "../../../../../../../../features/admin/productActionsSlice";

// Confirmation d'une annulation de champ
export const handleConfirmation = (
  confirmation,
  productActions,
  actions,
  clientId,
  productId,
  orderId,
  dispatch,
  productPrice,
  productState,
  setConfirmation,
  setEntryError,
  setProductActions
) => {
  const { confirmAction } = confirmation;
  const updateProductActions = (confirmAction) => {
    const dynamicProductActions = {
      ...Object.fromEntries(
        Object.entries(productActions).map(([key, value]) => [
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
      updateTotalsInOut({
        clientId,
        orderId,
        amount: productState.credit.amount,
        movement: "outCancel",
      })
    );
    return dispatch(
      updateActionContent({
        clientId,
        productId,
        orderId,
        updatedProperty: "credit",
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
  if (confirmAction === actions.REFUND) {
    dispatch(
      updateTotalsInOut({
        clientId,
        orderId,
        amount: productState.refund * productPrice,
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
