import React from "react";
import { MdModeEditOutline } from "react-icons/md";
import { TbInputX } from "react-icons/tb";
import { TbInputCheck } from "react-icons/tb";
import { formatDate } from "../../../helpers/formatDate";
// import { useSelector } from "react-redux";

const TrackingFieldAdmin = ({
  orderId,
  orderIndex,
  clientId,
  trackingNumber,
  isEditing,
  handleTrackingNumberChange,
  handleSaveTrackingNumber,
  handleEditTrackingNumber,
  handleDeleteTrackingNumber,
  sendDate,
}) => {
  // const dispatch = useDispatch();
  // const ordersStep = useSelector(
  //   (state) => state.ordersStep.find((user) => user.id === clientId)?.orders
  // );
  // const step = ordersStep[orderIndex]?.step

  const handleSaveTrackingNumberInternal = () => {
    // dispatch(orderActions({ orderId, isClientNotified: false,isNewOrder:false,step }));
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

export default TrackingFieldAdmin;
