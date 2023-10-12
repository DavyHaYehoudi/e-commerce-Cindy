import React, { useState } from "react";
import { orderStatus } from "../../../mocks/orderStatus";
import OrderHeader from "./OrderHeader";
import OrderStatus from "./OrderStatus";
import OrderDetails from "./OrderDetails";
import OrderProductsList from "./OrderProductsList";
import TrackingField from "./TrackingField";
import StatusButtons from "../../dumbs/StatusButton";
import { useDispatch } from "react-redux";
import { handleOrderStatusChange } from "../../../features/orderStatusSlice";

const AdminOrderItem = ({ order }) => {
  const dispatch = useDispatch();
  const [trackingNumber, setTrackingNumber] = useState("");
  const [isEditing, setIsEditing] = useState(true);
  const [creationDate, setCreationDate] = useState(null);
  const [lastModifiedDate, setLastModifiedDate] = useState(null);
  const [sendDate, setSendDate] = useState(null);

  const handleTrackingNumberChange = (event) => {
    setTrackingNumber(event.target.value);
    if (!creationDate) {
      setCreationDate(new Date());
    }
    setLastModifiedDate(new Date());
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
    setSendDate(new Date());
    // const dataToSend = {
    //   trackingNumber: trackingNumber,
    //   orderStatus: order.status,
    // };
  };

  return (
    <div className="admin-order-item">
      <OrderHeader order={order} handleSendToDatabase={handleSendToDatabase} />
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
          creationDate={creationDate}
          lastModifiedDate={lastModifiedDate}
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
              })
            );
          }}
        >
          Passer à l'étape suivante
        </button>
      </div>
      <StatusButtons isModified={true} handleSendToDatabase={handleSendToDatabase} />
    </div>
  );
};

export default AdminOrderItem;
