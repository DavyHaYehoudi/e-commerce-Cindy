import Transaction from "../Transaction";

export const generateItemTransactionComponent = (
  action,
  label,
  isActionSelected,
  inputQuantityValue,
  placeholderValue,
  actions,
  interaction,
  productsId,
  orderId,
  orderProducts,
  orderProductsInfo,
  orderProductsState,
  orderProductsActions,
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
      productsId={productsId}
      orderId={orderId}
      orderProducts={orderProducts}
      textCancel={`ANNULER ${label}`}
      orderProductsInfo={orderProductsInfo}
      orderProductsState={orderProductsState}
      isActionSelected={isActionSelected}
      inputQuantityValue={inputQuantityValue}
      orderProductsActions={orderProductsActions}
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
  orderProductsInfo,
  setConfirmation,
  orderProductsActions,
  actions,
  setProductActions,
  setInteraction
) => {
  setInteraction((prevState) => ({ ...prevState, activeLi: action }));
  // Si la propriété a une value c'est donc un click pour annulation
  if (orderProductsInfo?.[action]) {
    setConfirmation((prevState) => ({
      ...prevState,
      isConfirmationVisible: true,
      confirmAction: action,
    }));
    // Sinon, c'est pour attribuer une value à la propriété
  } else {
    const updatedProductActions = {
      ...orderProductsActions,
      isAddCredit: action === actions.CREDIT,
      isAddRefund: action === actions.REFUND,
      isAddExchange: action === actions.EXCHANGE,
      isAddNote: action === actions.NOTE,
    };
    setProductActions(updatedProductActions);
  }
};
