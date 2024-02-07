import React from "react";
import Header from "./Header";
import Details from "./Details";
import List from "../product";
import Listing from "./trackingField";
import { useSelector } from "react-redux";
import ToggleButton from "../../../../../shared/ToggleButton";
// import { sendToClient } from "../../../../../features/admin/ordersSlice";
import {
  getOrderInfo,
  getTrackingNumberList,
} from "../../../../../selectors/order";
import useSendToClient from "../hooks/useSendToClient";

const Item = ({
  client,
  order,
  orderIndex,
  isClientNotified,
  lastSentDateToClient,
  step,
}) => {
  const { productsByOrder } = useSelector((state) =>
  getOrderInfo(state, order._id)
  );
  const productsByOrderStore = useSelector(
    (state) => state?.productsByOrder?.data
  );
  const creditStore = useSelector((state) => state?.credit?.data);
  const trackingNumberList = useSelector((state) =>
    getTrackingNumberList(state, order?._id)
  );

  // const handleSendToClient = () => {
  //   dispatch(
  //     sendToClient({
  //       clientId: client._id,
  //       orderId: order?._id,
  //       isClientNotified: true,
  //     })
  //   );
  // };
  const { sendToClient, loading, error } = useSendToClient();

  const handleSendToClient = () => {
    const resultMapArray = [];

    productsByOrder.forEach((_id) => {
      const resultMap = {};

      const matchingObject = productsByOrderStore.find(
        (item) => item._id === _id
      );
      if (matchingObject) {
        resultMap["id"] = _id;
        resultMap["productsByOrderActions"] =
          matchingObject.productsByOrderActions;
      }

      const creditMatchingObject = creditStore.find(
        (item) => item.productsByOrderId === _id
      );
      if (creditMatchingObject) {
        resultMap["credit"] = creditMatchingObject;
      }

      resultMapArray.push(resultMap);
    });

    resultMapArray.push({
      step: step,
      trackingNumberList: trackingNumberList,
    });

    sendToClient(order?._id, resultMapArray);
  };

  return (
    <div
      className="admin-order-item"
      data-testid={`item-component-${order._id}`}
    >
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
