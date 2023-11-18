import React from "react";
import { processProduct } from "../../../../../features/admin/productActionsSlice";
import * as actions from "../../../../../constants/productActions";
import { useDispatch } from "react-redux";
import ItemActionsDetails from "./ItemActionsDetails";

const ItemActions = ({
  clientId,
  productId,
  orderId,
  isGenerateCredit,
  setIsGenerateCredit,
  isRefund,
  setIsRefund,
  isExchange,
  setIsExchange,
  activeLi,
  setActiveLi,
  isAddNote,
  setIsAddNote,
  setIsConfirmationVisible,
  setConfirmAction,
  productState,
  creditAmount,
  setCreditAmount,
  refundAmount,
  setRefundAmount,
  exchangeAmount,
  setExchangeAmount,
}) => {
  const dispatch = useDispatch();

  const actionFunctions = {
    [actions.ADD_NOTE]: () => setIsAddNote(!isAddNote),
    [actions.GENERATE_CREDIT]: () => handleCreditAction(actions.GENERATE_CREDIT, setIsGenerateCredit, setCreditAmount),
    [actions.EXCHANGE]: () => handleCreditAction(actions.EXCHANGE, setIsExchange, setExchangeAmount, exchangeAmount),
    [actions.REFUND]: () => handleCreditAction(actions.REFUND, setIsRefund, setRefundAmount, refundAmount),
    default: () => console.log("Error action clic"),
  };

  const handleActionClick = (action) => {
    setActiveLi(action);
    (actionFunctions[action] || actionFunctions.default)();
  };

  const handleCreditAction = (action, resetState, resetAmount, inputValue) => {
    dispatch(
      processProduct({
        clientId,
        productId,
        orderId,
        process: action,
      })
    );
    resetState(false);
    resetAmount("");
  };

  const handleAction = (action, resetState, resetAmount, inputValue) => {
    if (productState[action]) {
      handleCreditAction(action, resetState, resetAmount, inputValue);
    } else {
      resetState(true);
      if (inputValue) {
        handleCreditAction(action, resetState, resetAmount, inputValue);
      }
    }
  };

  const handleGenerateCredit = () => {
    handleAction(actions.GENERATE_CREDIT, setIsGenerateCredit, setCreditAmount, creditAmount);
  };

  return (
    <ul className="actions-list">
      <ItemActionsDetails
        activeLi={activeLi}
        action={actions.EXCHANGE}
        label={actions.EXCHANGE_LABEL}
        handleActionClick={handleActionClick}
        productState={productState}
        handleConfirmEntry={(e) => handleActionClick(actions.EXCHANGE)}
        handleCancelEntry={(e) => handleAction(actions.EXCHANGE, setIsExchange, setExchangeAmount, exchangeAmount)}
        isActionSelected={isExchange}
        inputValue={exchangeAmount}
        handleChangeInputValue={(e) => setExchangeAmount(e.target.value)}
        placeholderValue="Nombre d'articles à échanger"
        textCancel="Annuler l'échange"
      />

      <ItemActionsDetails
        activeLi={activeLi}
        action={actions.REFUND}
        label={actions.REFUND_LABEL}
        handleActionClick={handleActionClick}
        productState={productState}
        handleConfirmEntry={(e) => handleActionClick(actions.REFUND)}
        handleCancelEntry={(e) => handleAction(actions.REFUND, setIsRefund, setRefundAmount, refundAmount)}
        isActionSelected={isRefund}
        inputValue={refundAmount}
        handleChangeInputValue={(e) => setRefundAmount(e.target.value)}
        placeholderValue="Nombre d'articles à rembourser"
        textCancel="Annuler le remboursement"
      />

      <ItemActionsDetails
        activeLi={activeLi}
        action={actions.GENERATE_CREDIT}
        label={actions.CREDIT_LABEL}
        handleActionClick={handleActionClick}
        productState={productState}
        handleConfirmEntry={(e) => handleActionClick(actions.GENERATE_CREDIT)}
        handleCancelEntry={(e) => handleAction(actions.GENERATE_CREDIT, setIsGenerateCredit, setCreditAmount, creditAmount)}
        isActionSelected={isGenerateCredit}
        inputValue={creditAmount}
        handleChangeInputValue={(e) => setCreditAmount(e.target.value)}
        placeholderValue="Montant de l'avoir"
        textCancel="Annuler l'avoir en cours"
      />

      <li
        className={activeLi === actions.ADD_NOTE ? "active" : ""}
        onClick={() => handleActionClick(actions.ADD_NOTE)}
      >
        Ajouter une note
      </li>
    </ul>
  );
};

export default ItemActions;
