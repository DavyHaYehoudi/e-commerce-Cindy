import React from "react";

const ConfirmationModal = ({ handleConfirmation, handleCancel, message }) => {
  return (
    <div className="confirmation-popup">
      <span>{message}</span>
      <button onClick={handleConfirmation}>Confirmer</button>
      <button onClick={handleCancel}>Annuler</button>
    </div>
  );
};

export default ConfirmationModal;
