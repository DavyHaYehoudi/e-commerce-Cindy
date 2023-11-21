import React from "react";
import ToggleButton from "../../../../../shared/ToggleButton";

const ToggleButtonNote = ({ productState, handleChangeNoteValue }) => {
  return (
    <ToggleButton
      initialText="Note"
      hiddenText="Fermer"
      buttonClass="account-btn toggle"
      content={
        <div>
          <textarea
            className="product-note"
            value={productState.note || ""}
            onChange={(e) => handleChangeNoteValue(e)}
          >
            {" "}
          </textarea>
        </div>
      }
    />
  );
};

export default ToggleButtonNote;
