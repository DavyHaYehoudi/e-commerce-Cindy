import React from "react";
import useConfirmationFunctions from "./hooks/useConfirmationFunctions";

const Confirmation = ({
  handleSubmit,
  currentAction,
  addSecondariesImagesToFirebaseStorage,
  deleteSecondariesImagesFromStorage,
  fields,
}) => {
  const {
    confirmationEnabled,
    handleValidate,
    handleSaveChanges,
    handleDeleteProduct,
  } = useConfirmationFunctions({
    handleSubmit,
    addSecondariesImagesToFirebaseStorage,
    deleteSecondariesImagesFromStorage,
    fields,
  });

  return (
    <div className="confirm-section">
      {currentAction === "create" && (
        <button
          disabled={!confirmationEnabled}
          className={`account-btn ${
            confirmationEnabled ? "icon-validate" : ""
          }`}
          onClick={handleValidate}
        >
          Valider
        </button>
      )}

      <div className="edit-section">
        {currentAction === "edit" && (
          <>
            <button
              className="account-btn delete"
              onClick={handleDeleteProduct}
            >
              Supprimer le produit
            </button>
            <button
                className={`account-btn ${
                  confirmationEnabled ? "icon-validate" : ""
                }`}
              disabled={!confirmationEnabled}
              onClick={handleSaveChanges}
            >
              Enregistrer les modifications
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Confirmation;
