import React from "react";
import ToggleButton from "../../../../../../shared/ToggleButton";
import { IoSave } from "react-icons/io5";
import useToggleButtonNote from "./item/hooks/useToggleButtonNote";

const ToggleButtonNote = ({ orderProductsInfo, orderProducts }) => {
  const {
    isEdited,
    handleChangeNoteValue,
    handleNoteValidate,
    handleKeyPress,
  } = useToggleButtonNote(orderProductsInfo, orderProducts);

  return (
    <ToggleButton
      initialText="Note"
      hiddenText="Fermer"
      buttonClass="account-btn toggle"
      content={
        <>
          <small>
            {" "}
            {500 - orderProductsInfo?.note?.length || 500} caratère
            {(500 - orderProductsInfo?.note?.length > 1 ? "s" : "") || "s"}{" "}
            permis
          </small>{" "}
          <div className="product-note-wrapper">
            <textarea
              className="product-note"
              value={orderProductsInfo?.note || ""}
              onChange={(e) => handleChangeNoteValue(e)}
              onKeyDown={handleKeyPress}
            >
              {" "}
            </textarea>
            {isEdited && (
              <button
                className="account-btn icon-validate info-tooltip"
                aria-label="Enregistrer la note"
                onClick={handleNoteValidate}
              >
                <IoSave />
              </button>
            )}
          </div>
        </>
      }
    />
  );
};

export default ToggleButtonNote;
