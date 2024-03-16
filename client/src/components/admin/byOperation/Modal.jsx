import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({
  handleCloseModal,
  handleSubmit,
  handleInputChange,
  formData,
  isFormCompleted,
  error
}) => {
  return (
    <div className="promocodes-modal">
      <div className="promocodes-modal-content">
        <span className="promocodes-modal-close" onClick={handleCloseModal}>
          <AiOutlineClose />
        </span>
        <div className="promocodes-wrapper">
          <input
            type="text"
            placeholder="Code"
            className="account-input"
            name="code"
            value={formData?.code}
            onChange={handleInputChange}
          />
          <input
            type="number"
            placeholder="Pourcentage"
            className="account-input"
            name="percentage"
            value={formData?.percentage}
            onChange={handleInputChange}
          />
          <input
            type="date"
            placeholder="Date d'expiration"
            className="account-input"
            name="dateExpire"
            value={formData?.dateExpire}
            onChange={handleInputChange}
          />
         {error && <span className="error-message" >Choisir une date au-delà de celle du jour</span>}
          <button
            disabled={!isFormCompleted}
            className={`account-btn ${isFormCompleted ? "validate-btn" : ""}`}
            onClick={handleSubmit}
          >
            Valider
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
