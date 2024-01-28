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
    getTrackingNumberList(state, order?._id)
  );

  const handleSendToClient = () => {
    dispatch(
      sendToClient({
        clientId: client._id,
        orderId: order?._id,
        isClientNotified: true,
      })
    );
  };
  return (
    <div className="admin-order-item" data-testid={`item-component-${order._id}`}> 
      <Header
        order={order}
        orderIndex={orderIndex}
        client={client}
        step={step}
        isClientNotified={isClientNotified}
        lastSentDateToClient={lastSentDateToClient}
        handleSendToClient={handleSendToClient}
      />

      <Details order={order} orderId={order?._id} />
      <List client={client} orderId={order?._id} />

      <ToggleButton
        initialText="Suivis"
        hiddenText="Fermer"
        buttonClass="account-btn toggle"
        content={
          <Listing
            trackingNumberList={trackingNumberList}
            client={client}
            orderId={order?._id}
          />
        }
      />
    </div>
  );
};

export default Item;
