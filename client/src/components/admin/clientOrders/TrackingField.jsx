import React from "react";
import { MdModeEditOutline } from "react-icons/md";
import { BsTrash } from "react-icons/bs";
import { formatDate } from "../../../helpers/formatDate";

const TrackingField = ({
  trackingNumber,
  isEditing,
  handleTrackingNumberChange,
  handleSaveTrackingNumber,
  handleEditTrackingNumber,
  handleDeleteTrackingNumber,
  sendDate,
  creationDate,
  lastModifiedDate,
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
        {isEditing ? (
          <>
            <input
              type="text"
              id="trackingNumber"
              placeholder="Entrer le numéro de suivi"
              className="account-input"
              value={trackingNumber}
              onChange={handleTrackingNumberChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSaveTrackingNumber();
                }
              }}
            />
            <button onClick={handleSaveTrackingNumber}>Valider</button>
          </>
        ) : (
          <>
            {trackingNumber && (
              <>
                <span>{trackingNumber}</span>
                <button onClick={handleEditTrackingNumber}>
                  <MdModeEditOutline />{" "}
                </button>
                <button onClick={handleDeleteTrackingNumber}>
                  <BsTrash />
                </button>
              </>
            )}
          </>
        )}
      </div>
      <div className="admin-tracking-dates">
        {trackingNumber && (
          <>
            {creationDate && (
              <p>
                <small> Enregistré le {formatDate(creationDate)}</small>
              </p>
            )}
            {lastModifiedDate &&
              creationDate &&
              lastModifiedDate > creationDate && (
                <p>
                  <small>
                    Dernière modification : {formatDate(lastModifiedDate)}
                  </small>
                </p>
              )}
            {sendDate && (
              <p>
                <small>
                  {" "}
                  Envoyé à la base de données le {formatDate(sendDate)}
                </small>
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TrackingField;
