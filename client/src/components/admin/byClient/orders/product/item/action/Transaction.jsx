import React from "react";
import { useDispatch } from "react-redux";
import { updateActionContent } from "../../../../../../../features/admin/productsSlice";
import {
  handleCancelEntry,
  handleChangeInputQuantity,
  handleValidateEntry,
} from "./handler/transactions";
import { handleActionClick } from "./handler/item";
import { getProductProperties } from "../../../../../../../helpers/selectors/product";

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
  productsInfo,
  productsState,
  isActionSelected,
  inputQuantityValue,
  productsActions,
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
          productsInfo,
          setConfirmation,
          productsActions,
          actions,
          setProductActions,
          setInteraction
        )
      }
    >
      {productsInfo?.[action] ? textCancel : label}

      {isActionSelected && (
        <>
          <input
            type="number"
            className="productActionInput"
            value={inputQuantityValue || ""}
            min="0"
            max={articleNumber}
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
                productsInfo,
                productsActions,
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
