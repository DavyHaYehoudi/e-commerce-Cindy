import React from "react";
import * as actions from "../../../../../../constants/productActions";
import ActionsDetails from "./ActionsDetails";
import CreditAction from "./CreditAction";

const Actions = ({
  handleChangeInputQuantity,
  handleChangeInputDate,
  handleChangeInputCreditAmount,
  handleConfirmEntry,
  handleCancelEntry,
  interaction,
  setInteraction,
  productActions,
  setProductActions,
  setConfirmation,
  productState,
}) => {
  const {
    isAddCredit,
    isAddRefund,
    isAddExchange,
    creditContent,
    refundContent,
    exchangeContent,
  } = productActions;
console.log("credit content :",creditContent);
  const handleActionClick = (action) => {
    setInteraction((prevState) => ({ ...prevState, activeLi: action }));
    // Si la propriété a une value c'est donc un click pour annulation
    if (productState[action]) {
      setConfirmation((prevState) => ({
        ...prevState,
        isConfirmationVisible: true,
        confirmAction: action,
      }));
      // Sinon, c'est pour attribuer une value à la propriété
    } else {
      const updatedProductActions = {
        ...productActions,
        isAddCredit: action === actions.CREDIT,
        isAddRefund: action === actions.REFUND,
        isAddExchange: action === actions.EXCHANGE,
        isAddNote: action === actions.NOTE,
      };
      setProductActions(updatedProductActions);
    }
  };
  const handleCreditAction =(action)=>{
    setInteraction((prevState) => ({ ...prevState, activeLi: action }));
    // Si la propriété a une value c'est donc un click pour annulation
    if (productState[action].amount) {
      setConfirmation((prevState) => ({
        ...prevState,
        isConfirmationVisible: true,
        confirmAction: action,
      }));
      // Sinon, c'est pour attribuer une value à la propriété
    } else {
      const updatedProductActions = {
        ...productActions,
        isAddCredit: action === actions.CREDIT,
      };
      setProductActions(updatedProductActions);
    }
  }

  const generateItemActionsDetailsComponent = (
    action,
    label,
    isAddAction,
    actionContent,
    placeholder
  ) => {
    return (
      <ActionsDetails
        interaction={interaction}
        action={action}
        label={label}
        handleActionClick={handleActionClick}
        productState={productState}
        handleConfirmEntry={handleConfirmEntry}
        handleCancelEntry={handleCancelEntry}
        isActionSelected={isAddAction}
        inputQuantityValue={actionContent}
        inputDateValue={actionContent?.dateExpire}
        handleChangeInputQuantity={handleChangeInputQuantity}
        handleChangeInputDate={handleChangeInputDate}
        placeholderValue={placeholder}
        textCancel={`ANNULER ${label}`}
      />
    );
  };
  return (
    <ul className="actions-list">
      {generateItemActionsDetailsComponent(
        actions.EXCHANGE,
        actions.EXCHANGE_LABEL,
        isAddExchange,
        exchangeContent,
        "Nombre d'articles à échanger"
      )}
      {generateItemActionsDetailsComponent(
        actions.REFUND,
        actions.REFUND_LABEL,
        isAddRefund,
        refundContent,
        "Nombre d'articles à rembourser"
      )}
      <CreditAction
        interaction={interaction}
        action={actions.CREDIT}
        label={actions.CREDIT_LABEL}
        handleCreditAction={handleCreditAction}
        productState={productState}
        handleConfirmEntry={handleConfirmEntry}
        handleCancelEntry={handleCancelEntry}
        isActionSelected={isAddCredit}
        inputCreditAmount={creditContent.amount}
        inputDateValue={creditContent.dateExpire}
        handleChangeInputCreditAmount={handleChangeInputCreditAmount}
        handleChangeInputDate={handleChangeInputDate}
        placeholderValue="Montant de l'avoir"
        textCancel="ANNULER L'AVOIR"
      />
    </ul>
  );
};

export default Actions;
