import Transaction from "../Transaction";

export const generateItemTransactionComponent = (
  action,
  label,
  isActionSelected,
  inputQuantityValue,
  placeholderValue,
  actions,
  interaction,
  clientId,
  productId,
  orderId,
  productsInfo,
  productsState,
  productsActions,
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
      clientId={clientId}
      productId={productId}
      orderId={orderId}
      textCancel={`ANNULER ${label}`}
      productsInfo={productsInfo}
      productsState={productsState}
      isActionSelected={isActionSelected}
      inputQuantityValue={inputQuantityValue}
      productsActions={productsActions}
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
  productsInfo,
  setConfirmation,
  productsActions,
  actions,
  setProductActions,
  setInteraction
) => {
  setInteraction((prevState) => ({ ...prevState, activeLi: action }));
  // Si la propriété a une value c'est donc un click pour annulation
  if (productsInfo?.[action]) {
    setConfirmation((prevState) => ({
      ...prevState,
      isConfirmationVisible: true,
      confirmAction: action,
    }));
    // Sinon, c'est pour attribuer une value à la propriété
  } else {
    const updatedProductActions = {
      ...productsActions,
      isAddCredit: action === actions.CREDIT,
      isAddRefund: action === actions.REFUND,
      isAddExchange: action === actions.EXCHANGE,
      isAddNote: action === actions.NOTE,
    };
    setProductActions(updatedProductActions);
  }
};
