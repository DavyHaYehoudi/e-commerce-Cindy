import React, { useState } from "react";
import { orderStep } from "../../../../../constants/orderStep";
import Header from "./Header";
import Details from "./Details";
import List from "../product";
import TrackingField from "../../../../../shared/TrackingField";
import Listing from "./trackingField/Listing";
import { useDispatch, useSelector } from "react-redux";
import {
  sendToClient,
  trackingNumberAdminChange,
} from "../../../../../features/admin/orderStepSlice";
import { getTrackingNumberList } from "../../../../../helpers/storeDataUtils";
import TrackingFieldMain from "./trackingField";

const Item = ({
  clientId,
  order,
  orderIndex,
  isClientNotified,
  trackingNumberAdmin,
  lastSentDateToClient,
  step,
}) => {
  const [isTrackingNumberEdited, setIsTrackingNumberEdited] = useState(false);
  const [sendTrackingNumberDate, setSendTrackingNumberDate] = useState(null);
  const dispatch = useDispatch();
  const trackingNumberData = useSelector((state) => state.trackingNumber);
  const trackingNumberList = getTrackingNumberList(
    trackingNumberData,
    clientId,
    order?.id
  );

  const handleTrackingNumberAdminChange = (event) => {
    setIsTrackingNumberEdited(true);
    dispatch(
      trackingNumberAdminChange({
        orderId: order?.id,
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
        clientId,
        orderId: order?.id,
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

      <Details order={order} clientId={clientId} orderId={order?.id} />
      <List
        products={order?.products}
        clientId={clientId}
        orderId={order?.id}
      />
      {/* <TrackingFieldMain
        trackingNumberList={trackingNumberList}
        products={order?.products}
        clientId={clientId}
        orderId={order.id}
        trackingNumberAdmin={trackingNumberAdmin}
        handleTrackingNumberAdminChange={handleTrackingNumberAdminChange}
        sendTrackingNumberDate={sendTrackingNumberDate}
      /> */}
      <Listing
        trackingNumberList={trackingNumberList}
        clientId={clientId}
        orderId={order?.id}
      />
    </div>
  );
};

export default Item;
