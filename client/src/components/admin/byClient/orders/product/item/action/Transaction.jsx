import React from "react";
import { useDispatch } from "react-redux";
import { updateActionContent } from "../../../../../../../features/admin/productActionsSlice";
import {
  handleCancelEntry,
  handleChangeInputQuantity,
  handleValidateEntry,
} from "./handler/transactions";
import { handleActionClick } from "./handler/item";
import { getProductProperties } from "../../../../../../../helpers/storeDataUtils";

const Transaction = ({
  interaction,
  action,
  actions,
  label,
  placeholderValue,
  clientId,
  productId,
  orderId,
  textCancel,
  productState,
  productsState,
  isActionSelected,
  inputQuantityValue,
  productActions,
  articleNumber,
  setEntryError,
  setProductActions,
  setInteraction,
  setConfirmation,
}) => {
  const dispatch = useDispatch();
  const productPrice = getProductProperties(productId, productsState).pricing
    .currentPrice;
  return (
    <li
      className={interaction.activeLi === action ? "active" : ""}
      onClick={() =>
        handleActionClick(
          action,
          productState,
          setConfirmation,
          productActions,
          actions,
          setProductActions,
          setInteraction
        )
      }
    >
      {productState[action] ? textCancel : label}

      {isActionSelected && (
        <>
          <input
            type="number"
            className="productActionInput"
            value={inputQuantityValue || ""}
            min="0"
            onChange={(e) => {
              handleChangeInputQuantity(e, action, actions, setProductActions);
            }}
            onClick={(e) => e.stopPropagation()}
            placeholder={placeholderValue}
          />

          <button
            className="btn1"
            onClick={(e) =>
              handleValidateEntry(
                e,
                action,
                actions,
                productState,
                productActions,
                articleNumber,
                setEntryError,
                dispatch,
                updateActionContent,
                clientId,
                productId,
                orderId,
                setProductActions,
                productPrice
              )
            }
          >
            Valider
          </button>

          <button
            className="btn2"
            onClick={(e) =>
              handleCancelEntry(
                e,
                setEntryError,
                setProductActions,
                action,
                actions
              )
            }
          >
            Annuler
          </button>
        </>
      )}
    </li>
  );
};

export default Transaction;
