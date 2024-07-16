import React from "react";
import Header from "./Header";
import Details from "./Details";
import List from "../product";
import Listing from "./trackingField";
import ToggleButton from "../../../../../../shared/ToggleButton";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useOrderItem from "./hooks/useOrderItem";

const Item = ({
  client,
  order,
  orderIndex,
  lastSentDateToClient,
  step,
}) => {
  const {
    trackingNumberList,
    loading,
    handleSendToClient
  } = useOrderItem(order, step);
  return (
    <div
      className="admin-order-item"
      data-testid={`item-component-${order?._id}`}
    >
      {!loading ? (
        <Header
          order={order}
          orderIndex={orderIndex}
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
