import React from "react";
import useTrackingNumberForm from "./hooks/useTrackingNumberForm";

const TrackingNumberCreate = ({ orderId }) => {
  const {
    errors,
    trackingInfo,
    isFormValid,
    handleInputChange,
    handleValidate,
    handleCancel,
  } = useTrackingNumberForm(orderId);

  return (
    <div
      className="ClientTrackingNumberCreate"
      data-testid="ClientTrackingNumberCreate"
    >
      <div className="trackingNumber-content">
        <label htmlFor="trackingNumberInput">Numéro de suivi d'envoi : </label>
        <input
          type="text"
          id="trackingNumberInput"
          placeholder="Entrer le numéro de suivi"
          autoFocus
          value={trackingInfo.trackingField}
          onChange={(e) => handleInputChange("trackingField", e.target.value)}
        />
        {errors.trackingField && (
          <p className="error-message">{errors.trackingField}</p>
        )}
      </div>

      <label htmlFor="trackingNumberInputDate">Choisir une date d'envoi :</label>
      <input
        type="date"
        id="trackingNumberInputDate"
        value={trackingInfo.date}
        onChange={(e) => handleInputChange("date", e.target.value)}
      />
      {errors.date && <p className="error-message">{errors.date}</p>}

      <div className="AdminTrackingNumberCreate-validate">
        <button
          onClick={() => handleValidate(trackingInfo)}
          disabled={!isFormValid}
          className={!isFormValid ? "noValid" : "btn-confirm"}
        >
          Valider
        </button>
        <button onClick={handleCancel} className="btn-cancel">
          Annuler
        </button>
      </div>
    </div>
  );
};

export default TrackingNumberCreate;
