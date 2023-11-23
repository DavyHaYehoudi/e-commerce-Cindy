import React from "react";
import {
  handleCancelCreditEntry,
  handleChangeInputCreditAmount,
  handleChangeInputCreditDate,
  handleConfirmCreditEntry,
  handleCredit,
} from "./handler/credit";
import { updateActionContent } from "../../../../../../../features/admin/productActionsSlice";
import { useDispatch } from "react-redux";
import { generateRandomCode } from "../../../../../../../helpers/creditCode";

const Credit = ({
  interaction,
  action,
  actions,
  label,
  productState,
  isActionSelected,
  inputCreditAmount,
  inputDateValue,
  productActions,
  placeholderValue,
  textCancel,
  clientId,
  productId,
  orderId,
  setProductActions,
  setEntryError,
  setConfirmation,
  setInteraction,
}) => {
  const dispatch = useDispatch();
  return (
    <li
      className={interaction.activeLi === action ? "active" : ""}
      onClick={() =>
        handleCredit(
          action,
          setInteraction,
          productState,
          setConfirmation,
          productActions,
          actions,
          setProductActions
        )
      }
    >
      {productState[action].amount ? textCancel : label}

      {isActionSelected && (
        <>
          <input
            type="number"
            id="amountCreditField"
            className="productActionInput"
            value={inputCreditAmount || ""}
            min="0"
            onChange={(e) => {
              handleChangeInputCreditAmount(e, setProductActions);
            }}
            onClick={(e) => e.stopPropagation()}
            placeholder={placeholderValue}
          />

          <label htmlFor="dateExpireField">Valable jusqu'au :</label>
          <input
            type="date"
            id="dateExpireField"
            className="productActionInput"
            value={inputDateValue || ""}
            onChange={(e) => {
              handleChangeInputCreditDate(e, setProductActions);
            }}
            onClick={(e) => e.stopPropagation()}
            placeholder="Choisir une date de fin de validité"
          />

          <button
            className="btn1"
            onClick={(e) =>
              handleConfirmCreditEntry(
                e,
                action,
                productActions,
                setProductActions,
                setEntryError,
                generateRandomCode,
                dispatch,
                clientId,
                productId,
                orderId,
                updateActionContent
              )
            }
          >
            Valider
          </button>

          <button
            className="btn2"
            onClick={(e) =>
              handleCancelCreditEntry(e, setProductActions, setEntryError)
            }
          >
            Annuler
          </button>
        </>
      )}
    </li>
  );
};

export default Credit;
