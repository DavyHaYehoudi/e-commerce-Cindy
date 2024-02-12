import React, { useState } from "react";
import ToggleButton from "../../../../../shared/ToggleButton";
import { useDispatch } from "react-redux";
import { updateActionContent } from "../../../../../features/admin/productsByOrderSlice";

const ToggleButtonNote = ({ productsByOrderInfo, productsByOrder }) => {
  const dispatch = useDispatch();

  const handleChangeNoteValue = (e) => {
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
          </div>
        </>
      }
    />
  );
};

export default ToggleButtonNote;
