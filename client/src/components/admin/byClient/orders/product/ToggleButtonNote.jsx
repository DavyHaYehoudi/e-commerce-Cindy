import React, { useState } from "react";
import ToggleButton from "../../../../../shared/ToggleButton";
import { useDispatch } from "react-redux";
import {
  productsByOrderNote,
  updateActionContent,
} from "../../../../../features/admin/productsByOrderSlice";
import { IoSave } from "react-icons/io5";

const ToggleButtonNote = ({ productsByOrderInfo, productsByOrder }) => {
  const [isEdited, setIsEdited] = useState(false);
  const dispatch = useDispatch();

  const handleChangeNoteValue = (e) => {
    setIsEdited(true);
    const enteredText = e.target.value;
    if (enteredText.length <= 500) {
      dispatch(
        updateActionContent({
          productsByOrderId: productsByOrder._id,
          updatedProperty: "note",
          productActionContent: e.target.value,
        })
      );
    }
  };
  const handleNoteValidate = () => {
    setIsEdited(false);
    dispatch(
      productsByOrderNote({
        productsByOrderId: productsByOrder._id,
        content: productsByOrderInfo?.note,
      })
    );
  };
  return (
    <ToggleButton
      initialText="Note"
      hiddenText="Fermer"
      buttonClass="account-btn toggle"
      content={
        <>
          <small>
            {" "}
            {500 - productsByOrderInfo?.note?.length} caratère
            {500 - productsByOrderInfo?.note?.length > 1 ? "s" : ""} permis
          </small>{" "}
          <div className="product-note-wrapper">
            <textarea
              className="product-note"
              value={productsByOrderInfo?.note || ""}
              onChange={(e) => handleChangeNoteValue(e)}
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
