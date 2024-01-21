import React from "react";
import { getStepColor } from "../helpers/utils/getStepColor";
import { getOrderStepProperty } from "../helpers/constants/orderStep";

const OrderStep = ({ order }) => {
  const StepColorStyle = {
    backgroundColor: getStepColor(order.step),
    color: "#fff",
    padding: "5px",
    borderRadius: "5px",
  };

  return (
    <p>
      <span style={StepColorStyle} data-testid="order-step">
        {getOrderStepProperty(order.step)?.name}
      </span>
    </p>
  );
};

export default OrderStep;
