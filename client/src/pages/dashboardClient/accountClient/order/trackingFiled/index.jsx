import React from "react";
import { formatDate } from "../../../../../helpers/utils/formatDate";
import { TbInputX } from "react-icons/tb";
import useTrackingNumberDetails from "./hooks/useTrackingNumberDetails";

const TrackingNumberList = ({ trk, order }) => {
  const {
    isTrashConfirm,
    setIsTrashConfirm,
    handleConfirmCancel,
    productProperties,
  } = useTrackingNumberDetails(trk, order)||{};

  return (
    <>
      {trk && (
        <div
          className={`trackingNumber ${
            trk?.isAdmin
              ? "trackingNumberAdminItem"
              : "trackingNumberClientItem"
          }`}
          data-testid="tracking-number-list"
        >
          <p>
            {trk?.isAdmin
              ? "№ suivi de livraison : " + trk?.value
              : "№ suivi de retour client : " + trk?.value}
          </p>
          <p>
            <small>- Envoyé le {formatDate(trk?.date, false)}</small>
          </p>
          <ul>
            {productProperties &&
              productProperties.map((item, index) => (
                <li key={index}>
                  {item?.name} {item?.materialName}<br/> {item?.articlesNumber} article
                  {item?.articlesNumber > 1 ? "s" : ""}
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
      )}
    </>
  );
};

export default TrackingNumberList;
