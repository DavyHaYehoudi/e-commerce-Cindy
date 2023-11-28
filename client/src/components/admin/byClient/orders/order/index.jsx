import React from "react";
import Header from "./Header";
import Details from "./Details";
import List from "../product";
import Listing from "./trackingField";
import { useSelector } from "react-redux";
import { getTrackingNumberList } from "../../../../../helpers/storeDataUtils";
import ToggleButton from "../../../../../shared/ToggleButton";

const Item = ({
  clientId,
  order,
  orderIndex,
  isClientNotified,
  lastSentDateToClient,
  step,
}) => {
  const trackingNumberData = useSelector((state) => state.trackingNumber);
  const trackingNumberList = getTrackingNumberList(
    trackingNumberData,
    clientId,
    order?.id
  );

  return (
    <div className="admin-order-item">
      <Header
        order={order}
        orderIndex={orderIndex}
        clientId={clientId}
        step={step}
        isClientNotified={isClientNotified}
        lastSentDateToClient={lastSentDateToClient}
      />

      <Details order={order} clientId={clientId} orderId={order?.id} />
      <List
        products={order?.products}
        clientId={clientId}
        orderId={order?.id}
      />

      <ToggleButton
        initialText="Suivis"
        hiddenText="Fermer"
        buttonClass="account-btn toggle"
        content={
          <Listing
            trackingNumberList={trackingNumberList}
            clientId={clientId}
            orderId={order?.id}
          />
        }
      />
    </div>
  );
};

export default Item;
