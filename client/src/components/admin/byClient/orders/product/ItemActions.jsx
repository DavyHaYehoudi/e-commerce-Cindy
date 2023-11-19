import React from "react";
import { processProduct } from "../../../../../features/admin/productActionsSlice";
import * as actions from "../../../../../constants/productActions";
import { useDispatch } from "react-redux";
import ItemActionsDetails from "./ItemActionsDetails";

const ItemActions = ({
  clientId,
  productId,
  orderId,
  productActions,
  setProductActions,
  interaction,
  setInteraction,
  setConfirmation,
  productState,
}) => {
  const dispatch = useDispatch();
  const {
    isAddCredit,
    isAddRefund,
    isAddExchange,
    creditAmount,
    refundAmount,
    exchangeAmount,
  } = productActions;

  const handleActionClick = (action) => {
    setInteraction((prevState) => ({ ...prevState, activeLi: action }));
    switch (action) {
      case actions.NOTE:
        setProductActions((prevState) => ({
          ...prevState,
          isAddNote: !prevState.isAddNote,
        }));
        break;
      case actions.CREDIT:
        if (productState[action]) {
          setConfirmation((prevState) => ({
            ...prevState,
            isConfirmationVisible: true,
            confirmAction: action,
          }));
        } else {
          setProductActions((prevState) => ({
            ...prevState,
            isAddCredit: true,
          }));
          if (creditAmount) {
            handleGenerateCredit();
          }
        }
        break;
      case actions.EXCHANGE:
        if (productState[action]) {
          handleCreditAction(action);
        } else {
          setProductActions((prevState) => ({
            ...prevState,
            isAddExchange: true,
          }));
          if (exchangeAmount) {
            handleCreditAction(action);
          }
        }
        break;
      case actions.REFUND:
        if (productState[action]) {
          handleCreditAction(action);
        } else {
          setProductActions((prevState) => ({ ...prevState, isAddRefund: true }));
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
      setProductActions((prevState) => ({
        ...prevState,
        isAddRefund: false,
        refundAmount: "",
      }));
    }
    if (action === actions.EXCHANGE) {
      setProductActions((prevState) => ({
        ...prevState,
        isAddExchange: false,
        exchangeAmount: "",
      }));
    }
  };
  const handleGenerateCredit = () => {
    const creditValue = productState.credit ? null : creditAmount;
    console.log('productState.credit:', productState.credit)
    console.log('creditValue handleGenerateCredit de ItemActions:', creditValue)
    dispatch(
      processProduct({
        clientId,
        productId,
        orderId,
        process: actions.CREDIT,
        creditValue,
      })
    );
    setProductActions((prevState) => ({
      ...prevState,
      isAddCredit: false,
      creditAmount: "",
    }));
  };

  const handleConfirmEntry = (e, action) => {
    e.stopPropagation();
    handleActionClick(action);
  };
  const handleCancelEntry = (e, action) => {
    e.stopPropagation();
    switch (action) {
      case actions.EXCHANGE:
        setProductActions((prevState) => ({
          ...prevState,
          isAddExchange: false,
          exchangeAmount: "",
        }));
        break;
      case actions.REFUND:
        setProductActions((prevState) => ({
          ...prevState,
          isAddRefund: false,
          refundAmount: "",
        }));
        break;
      case actions.CREDIT:
        setProductActions((prevState) => ({
          ...prevState,
          isAddCredit: false,
          creditAmount: "",
        }));
        break;
      default:
        console.log("Error in handleCancelEntry");
    }
  };
  const handleChangeInputValue = (e, action) => {
    switch (action) {
      case actions.EXCHANGE:
        setProductActions((prevState) => ({
          ...prevState,
          exchangeAmount: e.target.value,
        }));
        break;
      case actions.REFUND:
        setProductActions((prevState) => ({
          ...prevState,
          refundAmount: e.target.value,
        }));
        break;
      case actions.CREDIT:
        setProductActions((prevState) => ({
          ...prevState,
          creditAmount: e.target.value,
        }));
        break;
      default:
        console.log("Error in handleChangeInputValue");
    }
  };
  return (
    <ul className="actions-list">
      <ItemActionsDetails
        interaction={interaction}
        action={actions.EXCHANGE}
        label={actions.EXCHANGE_LABEL}
        handleActionClick={handleActionClick}
        productState={productState}
        handleConfirmEntry={handleConfirmEntry}
        handleCancelEntry={handleCancelEntry}
        isActionSelected={isAddExchange}
        inputValue={exchangeAmount}
        handleChangeInputValue={handleChangeInputValue}
        placeholderValue="Nombre d'articles à échanger"
        textCancel="Annuler l'échange"
      />

      <ItemActionsDetails
        interaction={interaction}
        action={actions.REFUND}
        label={actions.REFUND_LABEL}
        handleActionClick={handleActionClick}
        productState={productState}
        handleConfirmEntry={handleConfirmEntry}
        handleCancelEntry={handleCancelEntry}
        isActionSelected={isAddRefund}
        inputValue={refundAmount}
        handleChangeInputValue={handleChangeInputValue}
        placeholderValue="Nombre d'articles à rembourser"
        textCancel="Annuler le remboursement"
      />
      <ItemActionsDetails
        interaction={interaction}
        action={actions.CREDIT}
        label={actions.CREDIT_LABEL}
        handleActionClick={handleActionClick}
        productState={productState}
        handleConfirmEntry={handleConfirmEntry}
        handleCancelEntry={handleCancelEntry}
        isActionSelected={isAddCredit}
        inputValue={creditAmount}
        handleChangeInputValue={handleChangeInputValue}
        placeholderValue="Montant de l'avoir"
        textCancel="Annuler l'avoir en cours"
      />

      <li
        className={interaction.activeLi === actions.NOTE ? "active" : ""}
        onClick={() => handleActionClick(actions.NOTE)}
      >
        Ajouter une note
      </li>
    </ul>
  );
};

export default ItemActions;
