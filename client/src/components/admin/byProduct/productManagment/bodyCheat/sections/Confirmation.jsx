import React from "react";

const Confirmation = ({
  handleSubmit,
  confirmationEnabled,
  currentAction,
  addImagesToFirebaseStorage,
  deleteImagesFromStorage,
}) => {
  return (
    <div className="confirm-section">
      {currentAction === "create" && (
        <button
          disabled={!confirmationEnabled}
          className={`account-btn ${
            confirmationEnabled ? "icon-validate" : ""
          }`}
          onClick={async () => {
            try {
              const paths= await addImagesToFirebaseStorage()
              handleSubmit(currentAction,paths);
            } catch (error) {
              console.log("error dans button valider :", error);
            }
          }}
        >
          Valider
        </button>
      )}
      {currentAction === "edit" && (
        <div className="edit-section">
          <button
            className="account-btn delete"
            onClick={() => handleSubmit("delete")}
          >
            Supprimer le produit
          </button>
          <button
            className="account-btn icon-validate"
            onClick={async () => {
              try {
                await deleteImagesFromStorage();
                handleSubmit(currentAction);
              } catch (error) {
                console.log(
                  "error dans button enregistrer les modifications :",
                  error
                );
              }
            }}
          >
            Enregistrer les modifications
          </button>
        </div>
      )}
    </div>
  );
};

export default Confirmation;
