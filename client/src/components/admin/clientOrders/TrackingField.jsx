import React from "react";
import { MdModeEditOutline } from "react-icons/md";
import { TbInputX } from "react-icons/tb";
import { TbInputCheck } from "react-icons/tb";
import { formatDate } from "../../../helpers/formatDate";
import { useDispatch } from "react-redux";
import { handleOrderStatusChange } from "../../../features/orderStatusSlice";

const TrackingField = ({
  orderId,
  trackingNumber,
  isEditing,
  handleTrackingNumberChange,
  handleSaveTrackingNumber,
  handleEditTrackingNumber,
  handleDeleteTrackingNumber,
  sendDate,
}) => {
  const dispatch = useDispatch();
  const handleSaveTrackingNumberInternal = () => {
    dispatch(handleOrderStatusChange({ orderId, isClientNotified: false }));
    handleSaveTrackingNumber();
  };

  const handleEditTrackingNumberInternal = () => {
    handleEditTrackingNumber();
  };

  const handleDeleteTrackingNumberInternal = () => {
    handleDeleteTrackingNumber();
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
              onKeyDown={(e) =>
                e.key === "Enter" && handleSaveTrackingNumberInternal()
              }
            />
            {trackingNumber && (
              <button
                onClick={handleSaveTrackingNumberInternal}
                className="account-btn icon-validate"
              >
                <TbInputCheck />
              </button>
            )}
          </>
        )}
        {!isEditing && trackingNumber && (
          <>
            <span>{trackingNumber}</span>
            <button
              onClick={handleEditTrackingNumberInternal}
              className="account-btn icon-edit"
            >
              <MdModeEditOutline />
            </button>
            <button
              onClick={handleDeleteTrackingNumberInternal}
              className="account-btn icon-trash"
            >
              <TbInputX />
            </button>
          </>
        )}
      </div>
      {sendDate && (
        <p className="admin-tracking-date">
          <small> Envoyé au client le : {formatDate(sendDate)}</small>
        </p>
      )}
    </div>
  );
};

export default TrackingField;
