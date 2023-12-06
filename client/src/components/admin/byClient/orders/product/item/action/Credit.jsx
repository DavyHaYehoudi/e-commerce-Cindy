import React from "react";
import {
  handleCancelCreditEntry,
  handleChangeInputCreditAmount,
  handleChangeInputCreditDate,
  handleConfirmCreditEntry,
  handleCredit,
} from "./handler/credit";
import { updateActionContent } from "../../../../../../../features/admin/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { getProductProperties } from "../../../../../../../selectors/product";

const Credit = ({
  interaction,
  action,
  actions,
  label,
  productsInfo,
  isActionSelected,
  inputCreditAmount,
  inputDateValue,
  productsActions,
  placeholderValue,
  textCancel,
  client,
  productId,
  orderId,
  products,
  setProductActions,
  setEntryError,
  setConfirmation,
  setInteraction,
}) => {
  const dispatch = useDispatch();
  const productsState = useSelector((state) => state.product);
  const productPrice = getProductProperties(productId,productsState).pricing.currentPrice
  return (
    <li
      className={interaction.activeLi === action ? "active" : ""}
      onClick={() =>
        handleCredit(
          action,
          setInteraction,
          productsInfo,
          setConfirmation,
          productsActions,
          actions,
          setProductActions
        )
      }
    >
      {productsInfo?.[action]? textCancel : label}

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
                productsActions,
                setProductActions,
                setEntryError,
                dispatch,
                client.id,
                productId,
                orderId,
                products,
                updateActionContent,
                productPrice
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
