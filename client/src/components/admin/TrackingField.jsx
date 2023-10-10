import React from "react";
import { MdModeEditOutline } from "react-icons/md";
import { BsTrash } from "react-icons/bs";

const TrackingField = ({
  trackingNumber,
  isEditing,
  handleTrackingNumberChange,
  handleSaveTrackingNumber,
  handleEditTrackingNumber,
  handleDeleteTrackingNumber,
  sendDate,
}) => {
  return (
    <div className="tracking-field">
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
              <span style={{ color: "black" }}>{trackingNumber}</span>
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
  );
};

export default TrackingField;
