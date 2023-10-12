import React from "react";
import { getStatusColor } from "../../../helpers/getStatusColor";

const OrderStatus = ({ order }) => {
  const statusColorStyle = {
    backgroundColor: getStatusColor(order.status),
    color: "#fff",
    padding: "5px",
    borderRadius: "5px",
  };

  return (
    <p>
      <span style={statusColorStyle}>{order.status}</span>
    </p>
  );
};

export default OrderStatus;
