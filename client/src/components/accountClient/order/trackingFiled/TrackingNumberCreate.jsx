import React, { useState } from "react";
import useTrackingNumberCreate from "./hooks/useTrackingNumberCreate";

const TrackingNumberCreate = ({ orderId, setTrackingNumberBoxOpen }) => {
  const [errors, setErrors] = useState({ trackingField: "", date: "" });
  const [trackingInfo, setTrackingInfo] = useState({
    trackingField: "",
    date: "",
  });

  const { handleValidate, handleCancel } = useTrackingNumberCreate({
    setErrors,
    setTrackingInfo,
    orderId,
    setTrackingNumberBoxOpen,
  });

  const isFormValid = !errors.trackingField && !errors.date;

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
          onChange={(e) => {
            setTrackingInfo({
              ...trackingInfo,
              trackingField: e.target.value,
            });
            setErrors({ ...errors, trackingField: "" });
          }}
        />
        {errors.trackingField && (
          <p className="error-message">{errors.trackingField}</p>
        )}
      </div>

      <label htmlFor="trackingNumberInputDate">
        Choisir une date d'envoi :
      </label>
      <input
        type="date"
        id="trackingNumberInputDate"
        value={trackingInfo.date}
        onChange={(e) => {
          setTrackingInfo({
            ...trackingInfo,
            date: e.target.value,
          });
          setErrors({ ...errors, date: "" });
        }}
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
