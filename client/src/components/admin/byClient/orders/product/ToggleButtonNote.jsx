import React, { useState } from "react";
import ToggleButton from "../../../../../shared/ToggleButton";
import { useNoteValueHandler } from "./item/action/hooks/useNoteValueHandler";
import { MdSaveAs } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { updateActionContent } from "../../../../../features/admin/productsByOrderSlice";

const ToggleButtonNote = ({ productsByOrderInfo, productsByOrder }) => {
  const [toSave, setToSave] = useState(false);
  const dispatch = useDispatch();
  const { handleChangeNoteValue } = useNoteValueHandler(
    productsByOrder,
    setToSave
  );
  const productActionContent = useSelector((state) =>
    state?.productsByOrder?.data.find((p) => p._id === productsByOrder._id)
  )?.productsByOrderActions?.note;

  const handleValidateNote = () => {
    setToSave(false);
    dispatch(
      updateActionContent({
        productsByOrderId: productsByOrder._id,
        updatedProperty: "note",
        productActionContent,
      })
    );
  };
  return (
    <ToggleButton
      initialText="Note"
      hiddenText="Fermer"
      buttonClass="account-btn toggle"
      content={
        <div className="product-note-wrapper">
          <textarea
            className="product-note"
            value={productsByOrderInfo?.note || ""}
            onChange={handleChangeNoteValue}
          >
            {" "}
          </textarea>
          {toSave && (
            <button
              className="account-btn icon-validate info-tooltip"
              aria-label="Sauvegarder les notes"
              onClick={handleValidateNote}
            >
              <MdSaveAs />
            </button>
          )}
        </div>
      }
    />
  );
};

export default ToggleButtonNote;
