import React from "react";
import { formatDate } from "../helpers/formatDate";

const TrackingField = ({
  trackingNumber,
  handleTrackingNumberChange,
  sendTrackingNumberDate,
  isAdmin,
}) => {

  return (
    <div className="tracking-field">
      <div className="tracking-number">
        <label
          htmlFor="trackingNumber"
          style={{ color: trackingNumber ? "black" : "red" }}
        >
         {isAdmin ? "№ DE SUIVI D'EXPEDITION VENDEUR :" : "№ DE SUIVI DU RETOUR DU PRODUIT :"}
        </label>

        <>
          <input
            type="text"
            id="trackingNumber"
            placeholder="Entrer le numéro de suivi"
            className="account-input"
            value={trackingNumber ||""}
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
