// ToggleButtonNote.js
import React, { useState } from "react";
import ToggleButton from "../../../../../shared/ToggleButton";
import { BsTrash } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { updateNoteContent } from "../../../../../features/admin/productActionsSlice";

const ToggleButtonNote = ({
  isAddNote,
  setIsAddNote,
  noteContent,
  orderId,
  clientId,
  productId,
}) => {
  const dispatch = useDispatch();
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);

  const handleNoteProduct = (e) => {
    dispatch(
      updateNoteContent({
        clientId,
        productId,
        orderId,
        content: e.target.value,
      })
    );
  };

  const handleTrashClick = () => {
    setIsConfirmationVisible(true);
  };
  const handleConfirmation = () => {
    dispatch(
      updateNoteContent({
        clientId,
        productId,
        orderId,
        content: null,
      })
    );

    setIsConfirmationVisible(false);
    setIsAddNote(false);
  };

  const handleCancel = () => {
    setIsConfirmationVisible(false);
  };

  return (
    <>
      <ToggleButton
        initialText="note"
        hiddenText="Fermer"
        buttonClass="account-btn toggle"
        content={
          <>
            <span
              id="trashNoteProduct"
              className="info-tooltip"
              aria-label="supprimer cette note"
              onClick={handleTrashClick}
            >
              {" "}
              <BsTrash />
            </span>
            <p>
              <textarea
                className="product-note"
                value={noteContent || ""}
                onChange={(e) => handleNoteProduct(e)}
              >
                {" "}
              </textarea>
            </p>
          </>
        }
      />
      {isConfirmationVisible && (
        <div className="confirmation-popup">
          <span>Voulez-vous vraiment supprimer cette note ?</span>
          <button onClick={handleConfirmation}>Oui</button>
          <button onClick={handleCancel}>Non</button>
        </div>
      )}
    </>
  );
};

export default ToggleButtonNote;
