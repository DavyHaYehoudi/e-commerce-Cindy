// AdminOrderItem.jsx
import React, { useState } from "react";
import { orderStatus } from "../../mocks/orderStatus";
import OrderHeader from "./OrderHeader";
import OrderStatus from "./OrderStatus";
import OrderDetails from "./OrderDetails";
import OrderProductsList from "./OrderProductsList";
import TrackingField from "./TrackingField";

const AdminOrderItem = ({ client, order, handleStatusChange }) => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [isEditing, setIsEditing] = useState(true);
  const [creationDate, setCreationDate] = useState(null);
  const [lastModifiedDate, setLastModifiedDate] = useState(null);
  const [sendDate, setSendDate] = useState(null);
  const [isModified, setIsModified] = useState(false);

  const handleTrackingNumberChange = (event) => {
    setTrackingNumber(event.target.value);
    if (!creationDate) {
      setCreationDate(new Date());
    }
    setLastModifiedDate(new Date());
  };

  const handleSaveTrackingNumber = () => {
    setIsEditing(false);
    setIsModified(true);
  };

  const handleEditTrackingNumber = () => {
    setIsEditing(true);
  };

  const handleDeleteTrackingNumber = () => {
    setTrackingNumber("");
    setIsEditing(true);
    setCreationDate(null);
    setLastModifiedDate(null);
    setSendDate(null);
    setIsModified(true);
  };

  const handleSendToDatabase = () => {
    setIsModified(false);
    setSendDate(new Date());
    const dataToSend = {
      trackingNumber: trackingNumber,
      orderStatus: order.status,
    };
  };

  return (
    <div className="admin-order-item">
      <OrderHeader
        order={order}
        handleSendToDatabase={handleSendToDatabase}
        isModified={isModified}
      />
      <OrderStatus order={order} />
      <OrderDetails order={order} />
      <OrderProductsList products={order.products} />
      {order.status === orderStatus[2].name && (
        <TrackingField
          trackingNumber={trackingNumber}
          isEditing={isEditing}
          handleTrackingNumberChange={handleTrackingNumberChange}
          handleSaveTrackingNumber={handleSaveTrackingNumber}
          handleEditTrackingNumber={handleEditTrackingNumber}
          handleDeleteTrackingNumber={handleDeleteTrackingNumber}
          sendDate={sendDate}
        />
      )}
      <div className="admin-order-next-step">
        <button
          className="move-to-next-step"
          onClick={() =>
            handleStatusChange(
              client.id,
              order.id,
              order.status
            )
          }
        >
          Passer à l'étape suivante
        </button>
      </div>
    </div>
  );
};

export default AdminOrderItem;
