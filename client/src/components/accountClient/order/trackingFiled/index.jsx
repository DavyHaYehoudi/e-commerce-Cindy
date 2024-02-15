import React, { useState } from "react";
import { formatDate } from "../../../../helpers/utils/formatDate";
import { TbInputX } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { deleteTrackingNumber } from "../../../../features/accountClient/customerSlice";
import { getProductProperties } from "../../../../selectors/product";
import { getMaterialProperty } from "../../../../helpers/constants/materials";

const TrackingNumberList = ({ trk, order }) => {
  const [isTrashConfirm, setIsTrashConfirm] = useState(false);
  const dispatch = useDispatch();
  const productStore = useSelector((state) => state?.product?.data);
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
        trk?.isAdmin ? "trackingNumberAdminItem" : "trackingNumberClientItem"
      }`}
      data-testid="tracking-number-list"
    >
      <p>
        {trk?.isAdmin
          ? "№ suivi de commande : " + trk?.value
          : "№ suivi de retour client : " + trk?.value}
      </p>
      <p>
        <small>- Envoyé le {formatDate(trk?.date, false)}</small>
      </p>
      <ul>
        {trk?.productsByOrder &&
          trk.productsByOrder.length > 0 &&
          trk.productsByOrder.map((item) => (
            <li key={item._id}>
              {getProductProperties(item.productId, productStore).name}{" "}
              {getMaterialProperty(item?.material).name}{" "}
              {item?.articlesNumber} article
              {item?.articlesNumber > 1 ? "s" : ""}{" "}
            </li>
          ))}
      </ul>
      {isTrashConfirm && (
        <div className="adminTrackingItemTrashConfirm">
          <p>⚠️ La suppression de ce numéro de suivi est définitive !</p>
          <button
            className="btn-confirm"
            onClick={() => handleConfirmCancel(trk?.id)}
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
      {!trk?.isAdmin && (
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
