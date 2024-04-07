import React from "react";

const Confirmation = ({ handleSubmit, confirmationEnabled, currentAction }) => {
  return (
    <div className="confirm-section">
      {currentAction === "create" && (
        <button
          disabled={!confirmationEnabled}
          className={`account-btn ${
            confirmationEnabled ? "icon-validate" : ""
          }`}
          onClick={handleSubmit}
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
            onClick={() => handleSubmit(currentAction)}
          >
            Enregistrer les modifications
          </button>
        </div>
      )}
    </div>
  );
};

export default Confirmation;
