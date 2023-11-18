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

  const handleActionClick = (action) => {
    setActiveLi(action);
    switch (action) {
      case actions.ADD_NOTE:
        setIsAddNote(!isAddNote);
        break;
      case actions.GENERATE_CREDIT:
        if (productState[action]) {
          setIsConfirmationVisible(true);
          setConfirmAction(action);
        } else {
          setIsGenerateCredit(true);
          if (creditAmount) {
            handleGenerateCredit();
          }
        }
        break;
      case actions.EXCHANGE:
        if (productState[action]) {
          handleCreditAction(action);
        } else {
          setIsExchange(true);
          if (exchangeAmount) {
            handleCreditAction(action);
          }
        }
        break;
      case actions.REFUND:
        if (productState[action]) {
          handleCreditAction(action);
        } else {
          setIsRefund(true);
          if (refundAmount) {
            handleCreditAction(action);
          }
        }
        break;
      default:
        console.log("Error action clic");
    }
  };

  const handleCreditAction = (action) => {
    dispatch(
      processProduct({
        clientId,
        productId,
        orderId,
        process: action,
      })
    );
    if (action === actions.REFUND) {
      setIsRefund(false);
      setRefundAmount("");
    }
    if (action === actions.EXCHANGE) {
      setIsExchange(false);
      setExchangeAmount("");
    }
  };
  const handleGenerateCredit = () => {
    const creditValue = productState.generateCredit ? null : creditAmount;
    dispatch(
      processProduct({
        clientId,
        productId,
        orderId,
        process: actions.GENERATE_CREDIT,
        creditValue,
      })
    );
    setIsGenerateCredit(false);
    setCreditAmount("");
  };

  const handleConfirmEntry = (e, action) => {
    e.stopPropagation();
    handleActionClick(action);
  };
  const handleCancelEntry = (e, action) => {
    e.stopPropagation();
    switch (action) {
      case actions.EXCHANGE:
        setIsExchange(false);
        setExchangeAmount("");
        break;
      case actions.REFUND:
        setIsRefund(false);
        setRefundAmount("");
        break;
      case actions.GENERATE_CREDIT:
        setIsGenerateCredit(false);
        setCreditAmount("");
        break;
      default:
        console.log("Error in handleCancelEntry");
    }
  };
  const handleChangeInputValue = (e, action) => {
    switch (action) {
      case actions.EXCHANGE:
        setExchangeAmount(e.target.value);
        break;
      case actions.REFUND:
        setRefundAmount(e.target.value);
        break;
      case actions.GENERATE_CREDIT:
        setCreditAmount(e.target.value);
        break;
      default:
        console.log("Error in handleChangeInputValue");
    }
  };
  return (
    <ul className="actions-list">
      <ItemActionsDetails
        activeLi={activeLi}
        action={actions.EXCHANGE}
        label={actions.EXCHANGE_LABEL}
        handleActionClick={handleActionClick}
        productState={productState}
        handleConfirmEntry={handleConfirmEntry}
        handleCancelEntry={handleCancelEntry}
        isActionSelected={isExchange}
        inputValue={exchangeAmount}
        handleChangeInputValue={handleChangeInputValue}
        placeholderValue="Nombre d'articles à échanger"
        textCancel="Annuler l'échange"
      />

      <ItemActionsDetails
        activeLi={activeLi}
        action={actions.REFUND}
        label={actions.REFUND_LABEL}
        handleActionClick={handleActionClick}
        productState={productState}
        handleConfirmEntry={handleConfirmEntry}
        handleCancelEntry={handleCancelEntry}
        isActionSelected={isRefund}
        inputValue={refundAmount}
        handleChangeInputValue={handleChangeInputValue}
        placeholderValue="Nombre d'articles à rembourser"
        textCancel="Annuler le remboursement"
      />
      <ItemActionsDetails
        activeLi={activeLi}
        action={actions.GENERATE_CREDIT}
        label={actions.CREDIT_LABEL}
        handleActionClick={handleActionClick}
        productState={productState}
        handleConfirmEntry={handleConfirmEntry}
        handleCancelEntry={handleCancelEntry}
        isActionSelected={isGenerateCredit}
        inputValue={creditAmount}
        handleChangeInputValue={handleChangeInputValue}
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
