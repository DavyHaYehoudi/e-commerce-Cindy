import React, { useState } from "react";
import { orderStep } from "../../../../../mocks/orderStep";
import Header from "./Header";
import Details from "./Details";
import List from "../product/List";
import TrackingField from "../../../../../shared/TrackingField";
import { useDispatch } from "react-redux";
import {
  sendToClient,
  trackingNumberAdminChange,
} from "../../../../../features/admin/orderStepSlice";

const Item = ({
  clientId,
  order,
  orderIndex,
  isClientNotified,
  trackingNumberAdmin,
  trackingNumberClient,
  lastSentDateToClient,
  step,
}) => {
  const dispatch = useDispatch();
  const [isTrackingNumberEdited, setIsTrackingNumberEdited] = useState(false);
  const [sendTrackingNumberDate, setSendTrackingNumberDate] = useState(null);

  const handleTrackingNumberAdminChange = (event) => {
    setIsTrackingNumberEdited(true);
    dispatch(
      trackingNumberAdminChange({
        orderId: order.id,
        isClientNotified: false,
        trackingNumberAdmin: event.target.value,
      })
    );
  };

  const handleSendToClient = () => {
    const currentDate = new Date();
    if (isTrackingNumberEdited) {
      setSendTrackingNumberDate(currentDate);
    }
    setIsTrackingNumberEdited(false);
    dispatch(
      sendToClient({
        orderId: order.id,
        isClientNotified: true,
      })
    );
  };

  return (
    <div className="admin-order-item">
      <Header
        order={order}
        orderIndex={orderIndex}
        clientId={clientId}
        step={step}
        handleSendToClient={() => handleSendToClient()}
        isClientNotified={isClientNotified}
        lastSentDateToClient={lastSentDateToClient}
      />

      <Details order={order} />
      <List products={order.products} />
      {order.step !== orderStep[0].name && order.step !== orderStep[1].name && (
        <TrackingField
          trackingNumber={trackingNumberAdmin}
          handleTrackingNumberChange={handleTrackingNumberAdminChange}
          sendTrackingNumberDate={sendTrackingNumberDate}
          isAdmin={true}
        />
      )}
      {(order.step === orderStep[3].name ||
        order.step === orderStep[4].name ||
        order.step === orderStep[5].name) && (
        <p>
          <span style={{paddingLeft:"10px"}} >№ DE SUIVI DU RETOUR CLIENT :</span> {trackingNumberClient}
        </p>
      )}
    </div>
  );
};

export default Item;
