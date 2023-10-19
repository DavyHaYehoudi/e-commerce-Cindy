import React from "react";
import { formatDate } from "../../../helpers/formatDate";

const TrackingFieldAdmin = ({
  trackingNumber,
  isTrackingNumberEdited,
  handleTrackingNumberChange,
  sendDate,
}) => {

  return (
    <div className="tracking-field">
      <div className="admin-tracking-number">
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
      {sendDate && (
        <p className="admin-tracking-date">
          <small> Dernier envoi au client le : {formatDate(sendDate)} </small>
        </p>
      )}
    </div>
  );
};

export default TrackingFieldAdmin;
