import Transaction from "../Transaction";

export const generateItemTransactionComponent = (
  action,
  label,
  isActionSelected,
  inputQuantityValue,
  placeholderValue,
  actions,
  interaction,
  productId,
  orderId,
  productsByOrder,
  productsByOrderInfo,
  productsByOrderState,
  productsByOrderActions,
  articleNumber,
  setEntryError,
  setProductActions,
  setInteraction,
  setConfirmation
) => {
  return (
    <Transaction
      interaction={interaction}
      action={action}
      actions={actions}
      label={label}
      placeholderValue={placeholderValue}
      productId={productId}
      orderId={orderId}
      productsByOrder={productsByOrder}
      textCancel={`ANNULER ${label}`}
      productsByOrderInfo={productsByOrderInfo}
      productsByOrderState={productsByOrderState}
      isActionSelected={isActionSelected}
      inputQuantityValue={inputQuantityValue}
      productsByOrderActions={productsByOrderActions}
      articleNumber={articleNumber}
      setEntryError={setEntryError}
      handleActionClick={handleActionClick}
      setProductActions={setProductActions}
      setInteraction={setInteraction}
      setConfirmation={setConfirmation}
    />
  );
};

export const handleActionClick = (
  action,
  productsByOrderInfo,
  setConfirmation,
  productsByOrderActions,
  actions,
  setProductActions,
  setInteraction
) => {
  setInteraction((prevState) => ({ ...prevState, activeLi: action }));
  // Si la propriété a une value c'est donc un click pour annulation
  if (productsByOrderInfo?.[action]) {
    setConfirmation((prevState) => ({
      ...prevState,
      isConfirmationVisible: true,
      confirmAction: action,
    }));
    // Sinon, c'est pour attribuer une value à la propriété
  } else {
    const updatedProductActions = {
      ...productsByOrderActions,
      isAddCredit: action === actions.CREDIT,
      isAddRefund: action === actions.REFUND,
      isAddExchange: action === actions.EXCHANGE,
      isAddNote: action === actions.NOTE,
    };
    setProductActions(updatedProductActions);
  }
};
