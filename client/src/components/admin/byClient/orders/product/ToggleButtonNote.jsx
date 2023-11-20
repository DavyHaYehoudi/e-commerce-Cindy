import React from "react";
import ToggleButton from "../../../../../shared/ToggleButton";
import * as actions from "../../../../../constants/productActions";

const ToggleButtonNote = ({
  handleChangeInputValue,
  noteContent,
  handleConfirmEntry,
  handleCancelEntry,
}) => {
  return (
    <ToggleButton
      initialText="note"
      hiddenText="Fermer"
      buttonClass="account-btn toggle"
      content={
        <>
          <textarea
            className="product-note"
            value={noteContent || ""}
            onChange={(e) => handleChangeInputValue(e, actions.NOTE)}
          >
            {" "}
          </textarea>
          <button
            className="btn1"
            onClick={(e) => handleConfirmEntry(e, actions.NOTE)}
          >
            Valider
          </button>

          <button
            className="btn2"
            onClick={(e) => handleCancelEntry(e, actions.NOTE)}
          >
            Annuler
          </button>
        </>
      }
    />
  );
};

export default ToggleButtonNote;
