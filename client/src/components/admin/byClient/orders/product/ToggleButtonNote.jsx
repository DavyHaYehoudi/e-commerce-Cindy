import React from "react";
import ToggleButton from "../../../../../shared/ToggleButton";
import { useNoteValueHandler } from "./item/action/hooks/useNoteValueHandler";

const ToggleButtonNote = ({ productsInfo, productId, actions }) => {
  const { handleChangeNoteValue } = useNoteValueHandler(productId, actions);
  return (
    <ToggleButton
      initialText="Note"
      hiddenText="Fermer"
      buttonClass="account-btn toggle"
      content={
        <div>
          <textarea
            className="product-note"
            value={productsInfo?.note || ""}
            onChange={handleChangeNoteValue}
          >
            {" "}
          </textarea>
        </div>
      }
    />
  );
};

export default ToggleButtonNote;
