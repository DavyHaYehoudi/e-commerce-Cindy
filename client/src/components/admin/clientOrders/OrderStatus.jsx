import React from "react";
import { getStatusColor } from "../../../helpers/getStatusColor";

const OrderStatus = ({ order }) => {
  return (
    <p>
      <span
        style={{
          backgroundColor: getStatusColor(order.status),
          color: "#fff",
          padding: "5px",
          borderRadius: "5px",
        }}
      >
        {order.status}
      </span>
    </p>
  );
};

export default OrderStatus;
