import React, { Fragment } from "react";

const CreditAction = ({
  interaction,
  action,
  label,
  handleCreditAction,
  productState,
  handleConfirmEntry,
  handleCancelEntry,
  isActionSelected,
  inputCreditAmount,
  inputDateValue,
  handleChangeInputCreditAmount,
  handleChangeInputDate,
  placeholderValue,
  textCancel,
}) => {
  return (
    <li
      className={interaction.activeLi === action ? "active" : ""}
      onClick={() => handleCreditAction(action)}
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
              handleChangeInputDate(e, action);
            }}
            onClick={(e) => e.stopPropagation()}
            placeholder="Choisir une date de fin de validité"
          />

          <button
            className="btn1"
            onClick={(e) => handleConfirmEntry(e, action)}
          >
            Valider
          </button>

          <button
            className="btn2"
            onClick={(e) => handleCancelEntry(e, action)}
          >
            Annuler
          </button>
        </>
      )}
    </li>
  );
};

export default CreditAction;
