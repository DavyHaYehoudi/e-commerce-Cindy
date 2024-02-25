import React, { useState } from "react";
import ToggleButton from "../../../../../shared/ToggleButton";
import { useDispatch } from "react-redux";
import {
  orderProductsNote,
  updateActionContent,
} from "../../../../../features/admin/orderProductsSlice";
import { IoSave } from "react-icons/io5";

const ToggleButtonNote = ({ orderProductsInfo, orderProducts }) => {
  const [isEdited, setIsEdited] = useState(false);
  const dispatch = useDispatch();

  const handleChangeNoteValue = (e) => {
    setIsEdited(true);
    const enteredText = e.target.value;
    if (enteredText.length <= 500) {
      dispatch(
        updateActionContent({
          orderProductsId: orderProducts._id,
          updatedProperty: "note",
          productActionContent: e.target.value,
        })
      );
    }
  };
  const handleNoteValidate = () => {
    setIsEdited(false);
    dispatch(
      orderProductsNote({
        orderProductsId: orderProducts._id,
        content: orderProductsInfo?.note,
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
            {500 - orderProductsInfo?.note?.length} caratère
            {500 - orderProductsInfo?.note?.length > 1 ? "s" : ""} permis
          </small>{" "}
          <div className="product-note-wrapper">
            <textarea
              className="product-note"
              value={orderProductsInfo?.note || ""}
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
