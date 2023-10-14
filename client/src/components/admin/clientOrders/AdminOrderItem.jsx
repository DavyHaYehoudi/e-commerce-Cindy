import React, { useState } from "react";
import { orderStatus } from "../../../mocks/orderStatus";
import OrderHeader from "./OrderHeader";
import OrderStatus from "./OrderStatus";
import OrderDetails from "./OrderDetails";
import OrderProductsList from "./OrderProductsList";
import TrackingField from "./TrackingField";
import { useDispatch, useSelector } from "react-redux";
import { handleOrderStatusChange } from "../../../features/orderStatusSlice";

const AdminOrderItem = ({ clientId, order, orderIndex }) => {
  const dispatch = useDispatch();
  const [trackingNumber, setTrackingNumber] = useState("");
  const [isEditing, setIsEditing] = useState(true);
  const [creationDate, setCreationDate] = useState(null);
  const [sendDate, setSendDate] = useState(null);
  const [lastSentDateToClient, setLastSentDateToClient] = useState(null);
  const [updateFromStatusButton, setUpdateFromStatusButton] = useState(true);

  console.log("updateFromStatusButton :", updateFromStatusButton);

  const ordersStatus = useSelector(
    (state) => state.ordersStatus.find((user) => user.id === clientId)?.orders
  );
  const status = ordersStatus[orderIndex]?.status;

  const handleTrackingNumberChange = (event) => {
    setTrackingNumber(event.target.value);
    if (!creationDate) {
      setCreationDate(new Date());
    }
  };

  const handleSaveTrackingNumber = () => {
    setIsEditing(false);
  };

  const handleEditTrackingNumber = () => {
    setIsEditing(true);
  };

  const handleDeleteTrackingNumber = () => {
    setTrackingNumber("");
    setIsEditing(true);
    setCreationDate(null);
    setSendDate(null);
  };

  const handleSendToDatabase = () => {
    const currentDate = new Date();
    if (trackingNumber) {
      setSendDate(currentDate);
    }

    dispatch(
      handleOrderStatusChange({
        orderId: order.id,
        isInProcessingOrder: true,
        isClientNotified: true,
        isNewOrder: false,
        status,
        lastSentDateToClient: updateFromStatusButton ? currentDate : null,
      })
    );
    if (updateFromStatusButton) {
      setLastSentDateToClient(currentDate);
      setUpdateFromStatusButton(false); 
    }
  };

  return (
    <div className="admin-order-item">
      <OrderHeader
        order={order}
        orderIndex={orderIndex}
        clientId={clientId}
        handleSendToDatabase={() => {
          setUpdateFromStatusButton(true);
          handleSendToDatabase();
        }}
        lastSentDateToClient={lastSentDateToClient}
      />
      <OrderStatus order={order} />
      <OrderDetails order={order} />
      <OrderProductsList products={order.products} />
      {order.status === orderStatus[2].name && (
        <TrackingField
          orderId={order.id}
          clientId={clientId}
          orderIndex={orderIndex}
          trackingNumber={trackingNumber}
          isEditing={isEditing}
          handleTrackingNumberChange={handleTrackingNumberChange}
          handleSaveTrackingNumber={handleSaveTrackingNumber}
          handleEditTrackingNumber={handleEditTrackingNumber}
          handleDeleteTrackingNumber={handleDeleteTrackingNumber}
          sendDate={sendDate}
          creationDate={creationDate}
        />
      )}
      <div className="admin-order-next-step">
        <button
          className="move-to-next-step"
          onClick={() => {
            dispatch(
              handleOrderStatusChange({
                orderId: order.id,
                isNextStatusOrder: true,
                isProcessed: false,
                isInProcessingOrder: true,
                isClientNotified: false,
              })
            );
          }}
        >
          Passer à l'étape suivante
        </button>
      </div>
    </div>
  );
};

export default AdminOrderItem;
