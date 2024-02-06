import React from "react";
import { useSelector } from "react-redux";
import { getProductProperties } from "../../../../../../../selectors/product";
import { useCreditHandler } from "./hooks/credit/useCreditHandler";
import { useCreditAmountHandler } from "./hooks/credit/useCreditAmountHandler";
import { useCreditDateHandler } from "./hooks/credit/useCreditDateHandler";
import { useConfirmCreditEntryHandler } from "./hooks/credit/useConfirmCreditEntryHandler";
import { useCancelCreditEntryHandler } from "./hooks/credit/useCancelCreditEntryHandler";

const Credit = ({
  interaction,
  action,
  actions,
  label,
  productsByOrderInfo,
  isActionSelected,
  inputCreditAmount,
  inputDateValue,
  productsByOrderActions,
  placeholderValue,
  textCancel,
  client,
  productId,
  orderId,
  productsByOrder,
  setProductActions,
  setEntryError,
  setConfirmation,
  setInteraction,
}) => {
  const productsByOrderState = useSelector((state) => state?.product?.data);
  const productPrice = getProductProperties(productId, productsByOrderState)?.pricing
    ?.currentPrice;
  const { handleCredit } = useCreditHandler(
    actions,
    setInteraction,
    setConfirmation,
    setProductActions,
    productsByOrderInfo,
    productsByOrderActions
  );
  const { handleChangeInputCreditAmount } =
    useCreditAmountHandler(setProductActions);
  const { handleChangeInputCreditDate } =
    useCreditDateHandler(setProductActions);
  const { handleConfirmCreditEntry } = useConfirmCreditEntryHandler();
  const { handleCancelCreditEntry } = useCancelCreditEntryHandler(
    setProductActions,
    setEntryError
  );
  return (
    <li
      className={interaction.activeLi === action ? "active" : ""}
      onClick={() => handleCredit(action)}
      data-testid ="credit-component"
    >
      {productsByOrderInfo?.[action] ? textCancel : label}

      {isActionSelected && (
        <>
          <input
            type="number"
            id="amountCreditField"
            className="productActionInput"
            value={inputCreditAmount || ""}
            min="0"
            onChange={(e) => {
              handleChangeInputCreditAmount(e);
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
              handleChangeInputCreditDate(e);
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
                productsByOrderActions,
                setProductActions,
                setEntryError,
                orderId,
                productsByOrder,
                productPrice
              )
            }
          >
            Valider
          </button>

          <button className="btn2" onClick={(e) => handleCancelCreditEntry(e)}>
            Annuler
          </button>
        </>
      )}
    </li>
  );
};

export default Credit;
