import React from "react";
import { formatDate } from "../../helpers/formatDate";

const TrackingField = ({
  trackingNumber,
  handleTrackingNumberChange,
  sendTrackingNumberDate,
}) => {

  return (
    <div className="tracking-field">
      <div className="tracking-number">
        <label
          htmlFor="trackingNumber"
          style={{ color: trackingNumber ? "black" : "red" }}
        >
         № DE SUIVI DE COMMANDE :
        </label>

        <>
          <input
            type="text"
            id="trackingNumber"
            placeholder="Entrer le numéro de suivi"
            className="account-input"
            value={trackingNumber}
            onChange={handleTrackingNumberChange}
          />
        </>
      </div>
      {sendTrackingNumberDate && (
        <p className="tracking-date">
          <small> Dernier envoi du numéro de suivi le : {formatDate(sendTrackingNumberDate)} </small>
        </p>
      )}
    </div>
  );
};

export default TrackingField;
