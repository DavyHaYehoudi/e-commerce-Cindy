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
  const productsState = useSelector((state) => state.product);
  const productPrice = getProductProperties(productId, productsState).pricing
    .currentPrice;
  const { handleCredit } = useCreditHandler(
    actions,
    setInteraction,
    setConfirmation,
    setProductActions,
    productsInfo,
    productsActions
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
    >
      {productsInfo?.[action] ? textCancel : label}

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
                productsActions,
                setProductActions,
                setEntryError,
                client.id,
                productId,
                orderId,
                products,
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
