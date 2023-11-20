import React from "react";
import * as actions from "../../../../../../constants/productActions";
import ActionsDetails from "./ActionsDetails";

const Actions = ({
  handleChangeInputValue,
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
    noteContent,
  } = productActions;

  const handleActionClick = (action) => {
    setInteraction((prevState) => ({ ...prevState, activeLi: action }));
    console.log("productState[action] :",productState[action]);
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
        inputValue={actionContent}
        handleChangeInputValue={handleChangeInputValue}
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
      {generateItemActionsDetailsComponent(
        actions.CREDIT,
        actions.CREDIT_LABEL,
        isAddCredit,
        creditContent,
        "Montant de l'avoir"
      )}

      <li
        className={interaction.activeLi === actions.NOTE ? "active" : ""}
        onClick={() => handleActionClick(actions.NOTE)}
      >
        {noteContent ? "ANNULER LA NOTE" : actions.NOTE_LABEL} 
      </li>
    </ul>
  );
};

export default Actions;
