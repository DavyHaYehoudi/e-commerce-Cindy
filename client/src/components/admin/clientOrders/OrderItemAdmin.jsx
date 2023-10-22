import React, { useState } from "react";
import { orderStep } from "../../../mocks/orderStep";
import OrderHeaderAdmin from "./OrderHeaderAdmin";
import OrderDetailsAdmin from "./OrderDetailsAdmin";
import OrderProductsListAdmin from "./OrderProductsListAdmin";
import TrackingField from "../../dumbs/TrackingField";
import { useDispatch } from "react-redux";
import {
  sendToClient,
  trackingNumberAdminChange,
} from "../../../features/orderStepSlice";

const OrderItemAdmin = ({
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
      <OrderHeaderAdmin
        order={order}
        orderIndex={orderIndex}
        clientId={clientId}
        step={step}
        handleSendToClient={() => handleSendToClient()}
        isClientNotified={isClientNotified}
        lastSentDateToClient={lastSentDateToClient}
      />

      <OrderDetailsAdmin order={order} />
      <OrderProductsListAdmin products={order.products} />
      {order.step !== orderStep[0].name && order.step !== orderStep[1].name && (
        <TrackingField
          trackingNumber={trackingNumberAdmin}
          handleTrackingNumberChange={handleTrackingNumberAdminChange}
          sendTrackingNumberDate={sendTrackingNumberDate}
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

export default OrderItemAdmin;
