import React, { useState } from "react";
import { formatDate } from "../../../../../../helpers/formatDate";
import ProductListItem from "./ProductListItem";
import { TbInputX } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { deleteTrackingNumber } from "../../../../../../features/admin/trackingNumberSlice";

const AdminTrackingItem = ({
  item,
  clientId,
  orderId,
  productStore,
  productsActionsStore,
}) => {
  const [isTrashConfirm, setIsTrashConfirm] = useState(false);
  const dispatch = useDispatch();
  const handleConfirmCancel = (trackingNumberId) => {
    dispatch(
      deleteTrackingNumber({
        clientId,
        orderId,
        trackingNumberId,
      })
    );
  };
  return (
    <div className="trackingNumber trackingNumberAdminItem">
      <div className="header">
        <p>
          <u>Numéro de suivi d'envoi</u>  : <span className="trackingNumberValue" >{item.value}</span> {" "}
          <small>- Envoyé le {formatDate(item.date)}</small>
        </p>
      </div>
      <ul className="products">
        {item?.products?.map((product) => (
          <ProductListItem
            key={product.id}
            product={product}
            clientId={clientId}
            orderId={orderId}
            articleNumber={product.articlesNumber}
            productStore={productStore}
            productsActionsStore={productsActionsStore}
          />
        ))}
      </ul>
      {isTrashConfirm && (
        <div className="adminTrackingItemTrashConfirm">
          <p>⚠️ La suppression de ce numéro de suivi est définitive !</p>
          <button
            className="btn-confirm"
            onClick={() => handleConfirmCancel(item.id)}
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
      <button
        className="account-btn icon-trash trackingNumber"
        onClick={() => setIsTrashConfirm(true)}
        aria-label="Supprimer ce numéro de suivi"
      >
        <TbInputX  aria-hidden="true" />{" "}
      </button>
    </div>
  );
};

export default AdminTrackingItem;
