import React, { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { formatDate } from "../../../helpers/formatDate";
import { TbInputX } from "react-icons/tb";
import { TbInputCheck } from "react-icons/tb";

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
  const [isModificationConfirmed, setIsModificationConfirmed] = useState(false);

  const isModified =
    lastModifiedDate && creationDate && lastModifiedDate > creationDate;

  const handleSaveTrackingNumberInternal = () => {
    handleSaveTrackingNumber();
    setIsModificationConfirmed(true);
  };

  const handleEditTrackingNumberInternal = () => {
    handleEditTrackingNumber();
    setIsModificationConfirmed(false);
  };

  const handleDeleteTrackingNumberInternal = () => {
    handleDeleteTrackingNumber();
    setIsModificationConfirmed(false);
  };

  return (
    <div className="tracking-field">
      <div className="admin-tracking-number">
        <label
          htmlFor="trackingNumber"
          style={{ color: trackingNumber ? "black" : "red" }}
        >
          № DE SUIVI DE COMMANDE :
        </label>
        {isEditing && (
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
                  handleSaveTrackingNumberInternal();
                }
              }}
            />
            {trackingNumber && (
              <button
                onClick={handleSaveTrackingNumberInternal}
                className="account-btn icon-validate"
              >
                <TbInputCheck />{" "}
              </button>
            )}
          </>
        )}
        {!isEditing && trackingNumber && (
          <>
            <span>{trackingNumber}</span>
            <button onClick={handleEditTrackingNumberInternal} className="account-btn icon-edit">
              <MdModeEditOutline />{" "}
            </button>
            <button onClick={handleDeleteTrackingNumberInternal} className="account-btn icon-trash">
              <TbInputX />
            </button>
          </>
        )}
      </div>
      {(isModificationConfirmed ||
        creationDate ||
        isModified ||
        sendDate ||
        isEditing) && (
        <div className="admin-tracking-dates">
          {creationDate && isModificationConfirmed && (
            <p className="admin-tracking-date">
              <small> Enregistré le : {formatDate(creationDate)}</small>
            </p>
          )}
          {isModified && isModificationConfirmed && (
            <p className="admin-tracking-date">
              <small>
                Dernière modification : {formatDate(lastModifiedDate)}
              </small>
            </p>
          )}
          {sendDate && (
            <p className="admin-tracking-date">
              <small>
                {" "}
                Envoyé à la base de données le : {formatDate(sendDate)}
              </small>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default TrackingField;
