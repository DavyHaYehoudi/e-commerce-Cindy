import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateActionContent } from "../../../../../../../../features/admin/orderProductsSlice";
import { handleActionClick } from "./handler/item";
import { useInputQuantityHandler } from "./hooks/transaction/useInputQuantityHandler";
import { useValidateEntryHandler } from "./hooks/transaction/useValidateEntryHandler";
import { useCancelEntryHandler } from "./hooks/transaction/useCancelEntryHandler";

const Transaction = ({
  interaction,
  action,
  actions,
  label,
  placeholderValue,
  orderId,
  orderProducts,
  textCancel,
  orderProductsInfo,
  isActionSelected,
  inputQuantityValue,
  orderProductsActions,
  articleNumber,
  setEntryError,
  setProductActions,
  setInteraction,
  setConfirmation,
}) => {
  const dispatch = useDispatch();
  const orderProductsStore = useSelector((state) => state?.orderProducts?.data);
  const { finalPrice } = orderProductsStore.find(
    (op) => op?._id === orderProducts?._id
  );
  const { handleChangeInputQuantity } = useInputQuantityHandler(
    actions,
    setProductActions
  );
  const { handleValidateEntry } = useValidateEntryHandler(
    actions,
    orderProducts,
    orderProductsInfo,
    orderProductsActions,
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
          orderProductsInfo,
          setConfirmation,
          orderProductsActions,
          actions,
          setProductActions,
          setInteraction
        )
      }
      data-testid="transaction-component"
    >
      {orderProductsInfo?.[action] ? textCancel : label}

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
                orderId,
                setProductActions,
                finalPrice
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
