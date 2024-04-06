import React from "react";

const Confirmation = ({ handleSubmit, confirmationEnabled }) => {
  return (
    <div className="confirm-section">
      <button
        disabled={!confirmationEnabled}
        className={`account-btn ${
          confirmationEnabled ? "icon-validate" : ""
        }`}
        onClick={handleSubmit}
      >
        Valider
      </button>
    </div>
  );
};

export default Confirmation;
