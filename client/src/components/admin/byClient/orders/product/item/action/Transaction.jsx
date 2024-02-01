import React from "react";
import { useDispatch } from "react-redux";
import { updateActionContent } from "../../../../../../../features/admin/productsByOrderSlice";
import { handleActionClick } from "./handler/item";
import { getProductProperties } from "../../../../../../../selectors/product";
import { useInputQuantityHandler } from "./hooks/transaction/useInputQuantityHandler";
import { useValidateEntryHandler } from "./hooks/transaction/useValidateEntryHandler";
import { useCancelEntryHandler } from "./hooks/transaction/useCancelEntryHandler";

const Transaction = ({
  interaction,
  action,
  actions,
  label,
  placeholderValue,
  clientId,
  productId,
  orderId,
  productsByOrder,
  textCancel,
  productsByOrderInfo,
  productsByOrderState,
  isActionSelected,
  inputQuantityValue,
  productsByOrderActions,
  articleNumber,
  setEntryError,
  setProductActions,
  setInteraction,
  setConfirmation,
}) => {
  const dispatch = useDispatch();
  const productPrice = getProductProperties(productId, productsByOrderState)?.pricing
    ?.currentPrice;
  const { handleChangeInputQuantity } = useInputQuantityHandler(
    actions,
    setProductActions
  );
  const { handleValidateEntry } = useValidateEntryHandler(
    actions,
    productsByOrder,
    productsByOrderInfo,
    productsByOrderActions,
    articleNumber,
    setEntryError,
    dispatch,
    updateActionContent
  );
  const { handleCancelEntry } = useCancelEntryHandler(
    actions,
    setProductActions
  );
  return (
    <li
      className={interaction.activeLi === action ? "active" : ""}
      onClick={() =>
        handleActionClick(
          action,
          productsByOrderInfo,
          setConfirmation,
          productsByOrderActions,
          actions,
          setProductActions,
          setInteraction
        )
      }
      data-testid="transaction-component"
    >
      {productsByOrderInfo?.[action] ? textCancel : label}

      {isActionSelected && (
        <>
          <input
            type="number"
            className="productActionInput"
            value={inputQuantityValue || ""}
            min="0"
            max={articleNumber}
            onChange={(e) => {
              handleChangeInputQuantity(e, action, actions);
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
                clientId,
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
            onClick={(e) => handleCancelEntry(e, setEntryError, action)}
          >
            Annuler
          </button>
        </>
      )}
    </li>
  );
};

export default Transaction;
