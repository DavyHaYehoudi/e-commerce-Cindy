import React, { useState } from "react";
import { orderStep } from "../../../mocks/orderStep";
import OrderHeader from "./OrderHeader";
import OrderDetails from "./OrderDetails";
import OrderProductsList from "./OrderProductsList";
import TrackingField from "./TrackingField";
import {  useSelector } from "react-redux";

const AdminOrderItem = ({ clientId, order, orderIndex }) => {
  // const dispatch = useDispatch();
  const [trackingNumber, setTrackingNumber] = useState("");
  const [isEditing, setIsEditing] = useState(true);
  const [creationDate, setCreationDate] = useState(null);
  const [sendDate, setSendDate] = useState(null);
  const [lastSentDateToClient, setLastSentDateToClient] = useState(null);
  const [updateFromStepButton, setUpdateFromStepButton] = useState(true);

  const ordersStep = useSelector(
    (state) => state.ordersStep.find((user) => user.id === clientId)?.orders
  );
  const step = ordersStep[orderIndex]?.step;

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

    // dispatch(
    //   orderActions({
    //     orderId: order.id,
    //     isInProcessingOrder: true,
    //     isClientNotified: true,
    //     isNewOrder: false,
    //     step,
    //     lastSentDateToClient: updateFromStepButton ? currentDate : null,
    //   })
    // );
    if (updateFromStepButton) {
      setLastSentDateToClient(currentDate);
      setUpdateFromStepButton(false); 
    }
  };

  return (
    <div className="admin-order-item">
      <OrderHeader
        order={order}
        orderIndex={orderIndex}
        clientId={clientId}
        step={step}
        handleSendToDatabase={() => {
          setUpdateFromStepButton(true);
          handleSendToDatabase();
        }}
        lastSentDateToClient={lastSentDateToClient}
      />
      
      <OrderDetails order={order} />
      <OrderProductsList products={order.products} />
      {order.step === orderStep[2].name && (
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
    </div>
  );
};

export default AdminOrderItem;
