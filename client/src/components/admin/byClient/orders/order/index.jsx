import React from "react";
import Header from "./Header";
import Details from "./Details";
import List from "../product";
import Listing from "./trackingField";
import { useDispatch, useSelector } from "react-redux";
import ToggleButton from "../../../../../shared/ToggleButton";
import { sendToClient } from "../../../../../features/admin/ordersSlice";
import { getTrackingNumberList } from "../../../../../selectors/order";

const Item = ({
  client,
  order,
  orderIndex,
  isClientNotified,
  lastSentDateToClient,
  step,
}) => {
  const dispatch = useDispatch();
  const trackingNumberList = useSelector((state) =>
    getTrackingNumberList(state, order?.id)
  );

  const handleSendToClient = () => {
    dispatch(
      sendToClient({
        clientId: client.id,
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
        client={client}
        step={step}
        isClientNotified={isClientNotified}
        lastSentDateToClient={lastSentDateToClient}
        handleSendToClient={handleSendToClient}
      />

      <Details order={order} orderId={order?.id} />
      <List client={client} orderId={order?.id} />

      <ToggleButton
        initialText="Suivis"
        hiddenText="Fermer"
        buttonClass="account-btn toggle"
        content={
          <Listing
            trackingNumberList={trackingNumberList}
            client={client}
            orderId={order?.id}
          />
        }
      />
    </div>
  );
};

export default Item;
