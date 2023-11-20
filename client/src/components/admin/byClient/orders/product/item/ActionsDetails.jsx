import React from "react";

const ActionsDetails = ({
  interaction,
  action,
  label,
  handleActionClick,
  productState,
  handleConfirmEntry,
  handleCancelEntry,
  isActionSelected,
  inputValue,
  handleChangeInputValue,
  placeholderValue,
  textCancel,
}) => {
  return (
    <li
      className={interaction.activeLi === action ? "active" : ""}
      onClick={() => handleActionClick(action)}
    >
      {productState[action] ? textCancel : label}

      {isActionSelected && (
        <>
          <input
            type="number"
            className="productActionInput"
            value={inputValue}
            min="0"
            onChange={(e) => {
              handleChangeInputValue(e,action);
            }}
            onClick={(e) => e.stopPropagation()}
            placeholder={placeholderValue}
          />

          <button
            className="btn1"
            onClick={(e) => handleConfirmEntry(e, action)}
          >
            Valider
          </button>

          <button
            className="btn2"
            onClick={(e) => handleCancelEntry(e,action)}
          >
            Annuler
          </button>
        </>
      )}
    </li>
  );
};

export default ActionsDetails;
