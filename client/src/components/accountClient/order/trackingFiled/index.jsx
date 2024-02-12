import React, { useState } from "react";
import { formatDate } from "../../../../helpers/utils/formatDate";
import { TbInputX } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { deleteTrackingNumber } from "../../../../features/accountClient/customerSlice";

const TrackingNumberList = ({ trk, order }) => {
  const [isTrashConfirm, setIsTrashConfirm] = useState(false);
  const dispatch = useDispatch();
  const handleConfirmCancel = (trackingNumberId) => {
    const orderId = order._id;
    dispatch(
      deleteTrackingNumber({
        orderId,
        trackingNumberId,
      })
    );
  };
  return (
    <div
      className={`trackingNumber ${
        trk.isAdmin ? "trackingNumberAdminItem" : "trackingNumberClientItem"
      }`}
      data-testid="tracking-number-list"
    >
      <p>
        {trk.isAdmin
          ? "№ suivi de commande : " + trk.value
          : "№ suivi de retour client : " + trk.value}
      </p>
      <p>
        <small>- Envoyé le {formatDate(trk.date, false)}</small>
      </p>
      {isTrashConfirm && (
        <div className="adminTrackingItemTrashConfirm">
          <p>⚠️ La suppression de ce numéro de suivi est définitive !</p>
          <button
            className="btn-confirm"
            onClick={() => handleConfirmCancel(trk.id)}
          >
            Confirmer
          </button>
          <button
            className="btn-cancel"
            onClick={() => setIsTrashConfirm(false)}
          >
            Annuler
          </button>
        </div>
      )}
      {!trk.isAdmin && (
        <button
          className="account-btn icon-trash trackingNumber"
          onClick={() => setIsTrashConfirm(true)}
          aria-label="Supprimer ce numéro de suivi"
        >
          <TbInputX aria-hidden="true" />{" "}
        </button>
      )}
    </div>
  );
};

export default TrackingNumberList;
