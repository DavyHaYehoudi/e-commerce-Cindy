import React from "react";
import Header from "./Header";
import Details from "./Details";
import List from "../product";
import Listing from "./trackingField";
import { useSelector } from "react-redux";
import ToggleButton from "../../../../../shared/ToggleButton";
import {
  getOrderInfo,
  getTrackingNumberList,
} from "../../../../../selectors/order";
import useSendToClient from "../hooks/useSendToClient";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const Item = ({
  client,
  order,
  orderIndex,
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

  const { sendToClient, loading } = useSendToClient();

  const handleSendToClient = (isClientNotNotified) => {
    if(!isClientNotNotified){
      return  toast.info(
        "Aucune modification n'a été apportée."
      );
    }
    const productsByOrderReqBody = [];
    const orderReqBody = {};

    productsByOrder.forEach((productsByOrderId) => {
      const resultMap = {};

      const matchingObject = productsByOrderStore.find(
        (item) => item._id === productsByOrderId
      );
      if (matchingObject) {
        resultMap["productsByOrder"] = matchingObject;
      }

      const creditMatchingObject = creditStore.find(
        (item) => item.productsByOrderId === productsByOrderId
      );
      if (creditMatchingObject) {
        resultMap["creditEdit"] = creditMatchingObject;
      }

      productsByOrderReqBody.push(resultMap);
    });

    orderReqBody["step"] = step;
    orderReqBody["trackingNumberList"] = trackingNumberList;

    sendToClient(order?._id, productsByOrderReqBody, orderReqBody);
  };

  return (
    <div
      className="admin-order-item"
      data-testid={`item-component-${order._id}`}
    >
      {!loading ? (
        <Header
          order={order}
          orderIndex={orderIndex}
          client={client}
          step={step}
          lastSentDateToClient={lastSentDateToClient}
          handleSendToClient={handleSendToClient}
        />
      ) : (
        <p className="sending">Envoi en cours...</p>
      )}

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
      <ToastContainer autoClose={2500} />
    </div>
  );
};

export default Item;
