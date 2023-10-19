import React, { useState } from "react";
import { orderStep } from "../../../mocks/orderStep";
import OrderHeaderAdmin from "./OrderHeaderAdmin";
import OrderDetailsAdmin from "./OrderDetailsAdmin";
import OrderProductsListAdmin from "./OrderProductsListAdmin";
import TrackingFieldAdmin from "./TrackingFieldAdmin";
import { useSelector } from "react-redux";

const OrderItemAdmin = ({ clientId, order, orderIndex }) => {
  // const dispatch = useDispatch();
  const [trackingNumber, setTrackingNumber] = useState("");
  const [isTrackingNumberEdited, setIsTrackingNumberEdited] = useState(false);
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
    setIsTrackingNumberEdited(true);
    if (!creationDate) {
      setCreationDate(new Date());
    }
  };

  const handleSendToClient = () => {
    const currentDate = new Date();
    if (isTrackingNumberEdited) {
      setSendDate(currentDate);
    }

    if (updateFromStepButton) {
      setLastSentDateToClient(currentDate);
      setUpdateFromStepButton(false);
    }
    setIsTrackingNumberEdited(false)
  };

  return (
    <div className="admin-order-item">
      <OrderHeaderAdmin
        order={order}
        orderIndex={orderIndex}
        clientId={clientId}
        step={step}
        handleSendToClient={() => {
          setUpdateFromStepButton(true);
          handleSendToClient();
        }}
        lastSentDateToClient={lastSentDateToClient}
      />

      <OrderDetailsAdmin order={order} />
      <OrderProductsListAdmin products={order.products} />
      {order.step === orderStep[2].name && (
        <TrackingFieldAdmin
          trackingNumber={trackingNumber}
          isTrackingNumberEdited={isTrackingNumberEdited}
          handleTrackingNumberChange={handleTrackingNumberChange}
          sendDate={sendDate}
          creationDate={creationDate}
        />
      )}
    </div>
  );
};

export default OrderItemAdmin;
