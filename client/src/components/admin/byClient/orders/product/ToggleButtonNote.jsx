import React from "react";
import ToggleButton from "../../../../../shared/ToggleButton";
import { useNoteValueHandler } from "./item/action/hooks/useNoteValueHandler";

const ToggleButtonNote = ({ productsByOrderInfo, actions,productsByOrder }) => {
  const { handleChangeNoteValue } = useNoteValueHandler(actions,productsByOrder);
  return (
    <ToggleButton
      initialText="Note"
      hiddenText="Fermer"
      buttonClass="account-btn toggle"
      content={
        <div>
          <textarea
            className="product-note"
            value={productsByOrderInfo?.note || ""}
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
